import { useState, useCallback } from "react";
import { useAccount } from "@starknet-react/core";
import { Account } from "starknet";
import { useDojoSDK } from "@dojoengine/sdk/react";
import { useStarknetConnect } from "./useStarknetConnect";
import useAppStore from "../../zustand/store";
import { cairoShortStringToFelt } from "@dojoengine/torii-wasm";
import { lookupAddresses } from '@cartridge/controller';

// Types
interface ClaimPlayerState {
  isClaiming: boolean;
  error: string | null;
  completed: boolean;
  step: "connecting" | "creating_user" | "claiming" | "success";
  txHash: string | null;
  txStatus: "PENDING" | "SUCCESS" | "REJECTED" | null;
}

interface ClaimPlayerResponse {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

export const useClaimPlayer = () => {
  const { client } = useDojoSDK();
  const { account } = useAccount();
  const { status } = useStarknetConnect();
  const { 
    setIsClaimingPlayer, 
    setClaimSuccess,
    setUser,
    setUniversePlayer,
    setOvergoalPlayer,
    setSeasonPlayer
  } = useAppStore();

  // Local state
  const [claimState, setClaimState] = useState<ClaimPlayerState>({
    isClaiming: false,
    error: null,
    completed: false,
    step: "connecting",
    txHash: null,
    txStatus: null,
  });

  /**
   * Claims a player by their ID
   * Steps:
   * 1. Connect to Cartridge Controller
   * 2. Call create_or_get_user with address and username
   * 3. Call claim_player with player_id
   * 4. Update store with player data
   */
  const claimPlayer = useCallback(async (playerId: string): Promise<ClaimPlayerResponse> => {
    // Validation: Check that the controller is connected
    if (status !== "connected") {
      const error = "Controller not connected. Please connect your controller first.";
      setClaimState((prev) => ({ ...prev, error }));
      return { success: false, error };
    }

    // Validation: Check that the account exists
    if (!account) {
      const error = "No account found. Please connect your controller.";
      setClaimState((prev) => ({ ...prev, error }));
      return { success: false, error };
    }

    try {
      // Start claiming process
      setClaimState({
        isClaiming: true,
        error: null,
        completed: false,
        step: "connecting",
        txHash: null,
        txStatus: null,
      });
      setIsClaimingPlayer(true);

      console.log("🎮 Starting player claim process...");
      console.log("🆔 Player ID:", playerId);
      console.log("👤 Account address:", account.address);

      // Step 1: Get username from Cartridge
      setClaimState((prev) => ({ ...prev, step: "creating_user" }));
      console.log("🔍 Looking up username from Cartridge...");
      
      const usernameMap = await lookupAddresses([account.address]);
      const username = usernameMap.get(account.address) || "";
      
      console.log("✅ Username found:", username);

      // Step 2: Create or get user
      console.log("👤 Creating/getting user...");
      const createUserTx = await client.game.createOrGetUser(
        account as Account,
        account.address,
        cairoShortStringToFelt(username),
      );

      console.log("📥 Create user transaction response:", createUserTx);

      if (!createUserTx || createUserTx.code !== "SUCCESS") {
        throw new Error("Failed to create/get user: " + createUserTx?.code);
      }

      // Wait for user creation to be processed
      console.log("⏳ Waiting for user creation to be processed...");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Step 3: Claim the player
      setClaimState((prev) => ({ 
        ...prev, 
        step: "claiming",
        txStatus: "PENDING"
      }));
      
      console.log("🎯 Claiming player with ID:", playerId);
      
      const claimTx = await client.game.claimPlayer(
        account as Account,
        playerId,
      );

      console.log("📥 Claim transaction response:", claimTx);

      if (claimTx?.transaction_hash) {
        setClaimState((prev) => ({
          ...prev,
          txHash: claimTx.transaction_hash,
        }));
      }

      if (claimTx && claimTx.code === "SUCCESS") {
        console.log("🎉 Player claimed successfully!");

        setClaimState((prev) => ({
          ...prev,
          txStatus: "SUCCESS",
          step: "success",
        }));

        // Wait for the transaction to be processed
        console.log("⏳ Waiting for claim transaction to be processed...");
        await new Promise((resolve) => setTimeout(resolve, 3500));

        // Mark as complete
        setClaimState((prev) => ({
          ...prev,
          completed: true,
          isClaiming: false,
        }));

        setIsClaimingPlayer(false);
        setClaimSuccess(true);

        return {
          success: true,
          transactionHash: claimTx.transaction_hash,
        };
      } else {
        setClaimState((prev) => ({
          ...prev,
          txStatus: "REJECTED",
        }));
        throw new Error("Claim transaction failed with code: " + claimTx?.code);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to claim player. Please try again.";

      console.error("❌ Error claiming player:", error);

      setClaimState((prev) => ({
        ...prev,
        error: errorMessage,
        isClaiming: false,
        step: "connecting",
        txStatus: "REJECTED",
      }));

      setIsClaimingPlayer(false);
      return { success: false, error: errorMessage };
    }
  }, [status, account, client.game, setIsClaimingPlayer, setClaimSuccess]);

  /**
   * Reset the claim state
   */
  const resetClaimState = useCallback(() => {
    console.log("🔄 Resetting claim state...");
    setClaimState({
      isClaiming: false,
      error: null,
      completed: false,
      step: "connecting",
      txHash: null,
      txStatus: null,
    });
    setIsClaimingPlayer(false);
    setClaimSuccess(false);
  }, [setIsClaimingPlayer, setClaimSuccess]);

  return {
    // State
    isClaiming: claimState.isClaiming,
    error: claimState.error,
    completed: claimState.completed,
    currentStep: claimState.step,
    txHash: claimState.txHash,
    txStatus: claimState.txStatus,
    isConnected: status === "connected",

    // Actions
    claimPlayer,
    resetClaimState,
  };
};

