import { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAccount } from "@starknet-react/core";
import { Account } from "starknet";
import { useDojoSDK } from "@dojoengine/sdk/react";
import { useStarknetConnect } from "./useStarknetConnect";
import { useOvergoalPlayer } from "./useOvergoalPlayer";
import useAppStore from "../../zustand/store";

// Types
interface InitializeOvergoalState {
  isInitializing: boolean;
  error: string | null;
  completed: boolean;
  step: 'checking' | 'spawning' | 'loading' | 'success';
  txHash: string | null;
  txStatus: 'PENDING' | 'SUCCESS' | 'REJECTED' | null;
}

interface InitializeOvergoalResponse {
  success: boolean;
  overgoalPlayerExists: boolean;
  transactionHash?: string;
  error?: string;
}

export const useCreateOvergoalPlayer = () => {
  const { useDojoStore, client } = useDojoSDK();
  const dojoState = useDojoStore((state) => state);
  const { account } = useAccount();
  const { status } = useStarknetConnect();
  const { overgoalPlayer, isLoading: overgoalPlayerLoading, refetch: refetchOvergoalPlayer } = useOvergoalPlayer();
  const { setLoading } = useAppStore();

  // Local state
  const [initState, setInitState] = useState<InitializeOvergoalState>({
    isInitializing: false,
    error: null,
    completed: false,
    step: 'checking',
    txHash: null,
    txStatus: null
  });

  // Tracking if we are initializing
  const [isInitializing, setIsInitializing] = useState(false);

  /**
   * Checks if the overgoal player exists and initializes as needed
   */
  const initializeOvergoalPlayer = useCallback(async (playerId: number): Promise<InitializeOvergoalResponse> => {
    // Prevent multiple executions
    if (isInitializing) {
      console.log(playerId);
      return { success: false, overgoalPlayerExists: false, error: "Already initializing" };
    }

    setIsInitializing(true);

    // Validation: Check that the controller is connected
    if (status !== "connected") {
      const error = "Controller not connected. Please connect your controller first.";
      setInitState(prev => ({ ...prev, error }));
      setIsInitializing(false);
      return { success: false, overgoalPlayerExists: false, error };
    }

    // Validation: Check that the account exists
    if (!account) {
      const error = "No account found. Please connect your controller.";
      setInitState(prev => ({ ...prev, error }));
      setIsInitializing(false);
      return { success: false, overgoalPlayerExists: false, error };
    }

    const transactionId = uuidv4();

    try {
      // Start initialization process
      setInitState(prev => ({
        ...prev,
        isInitializing: true,
        error: null,
        step: 'checking'
      }));

      console.log("🎮 Starting overgoal player initialization...");

      // Refetch overgoal player data
      console.log("🔄 Fetching latest overgoal player data...");
      await refetchOvergoalPlayer();

      // Wait a bit to ensure data is loaded
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Direct check from the store
      const storeOvergoalPlayer = useAppStore.getState().overgoalPlayer;

      // Simple check if the overgoal player exists in the store
      const overgoalPlayerExists = storeOvergoalPlayer !== null;

      console.log("🎮 Final overgoal player check:", {
        overgoalPlayerExists,
        overgoalPlayerInStore: !!storeOvergoalPlayer,
        accountAddress: account.address
      });

      if (overgoalPlayerExists) {
        // Overgoal player exists - load data and continue
        console.log("✅ Overgoal player already exists, continuing with existing data...");

        setInitState(prev => ({
          ...prev,
          step: 'loading'
        }));

        // Small delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 1000));

        setInitState(prev => ({
          ...prev,
          completed: true,
          isInitializing: false,
          step: 'success'
        }));

        setIsInitializing(false);
        return {
          success: true,
          overgoalPlayerExists: true
        };

      } else {
        // Overgoal player does not exist - create new overgoal player
        console.log("🆕 Overgoal player does not exist, spawning new overgoal player...");

        setInitState(prev => ({
          ...prev,
          step: 'spawning',
          txStatus: 'PENDING'
        }));

        // Execute spawn transaction
        console.log("📤 Executing spawn overgoal player transaction...");
        const spawnTx = await client.game.spawnOvergoalPlayer(account as Account);

        console.log("📥 Spawn overgoal player transaction response:", spawnTx);

        if (spawnTx?.transaction_hash) {
          setInitState(prev => ({
            ...prev,
            txHash: spawnTx.transaction_hash
          }));
        }

        if (spawnTx && spawnTx.code === "SUCCESS") {
          console.log("🎉 Overgoal player spawned successfully!");

          setInitState(prev => ({
            ...prev,
            txStatus: 'SUCCESS'
          }));

          // Wait for the transaction to be processed
          console.log("⏳ Waiting for transaction to be processed...");
          await new Promise(resolve => setTimeout(resolve, 3500));

          // Refetch overgoal player data
          console.log("🔄 Refetching overgoal player data after spawn...");
          await refetchOvergoalPlayer();

          setInitState(prev => ({
            ...prev,
            completed: true,
            isInitializing: false,
            step: 'success'
          }));

          // Confirm transaction in the Dojo store
          dojoState.confirmTransaction(transactionId);

          setIsInitializing(false);
          return {
            success: true,
            overgoalPlayerExists: false,
            transactionHash: spawnTx.transaction_hash
          };
        } else {
          // Update transaction state to rejected
          setInitState(prev => ({
            ...prev,
            txStatus: 'REJECTED'
          }));
          throw new Error("Spawn overgoal player transaction failed with code: " + spawnTx?.code);
        }
      }

    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : "Failed to initialize overgoal player. Please try again.";

      console.error("❌ Error initializing overgoal player:", error);

      // Revert optimistic update if applicable
      dojoState.revertOptimisticUpdate(transactionId);

      // Update transaction state to rejected if there was a transaction
      if (initState.txHash) {
        setInitState(prev => ({
          ...prev,
          txStatus: 'REJECTED'
        }));
      }

      setInitState(prev => ({
        ...prev,
        error: errorMessage,
        isInitializing: false,
        step: 'checking'
      }));

      setIsInitializing(false);
      return { success: false, overgoalPlayerExists: false, error: errorMessage };
    }
  }, [status, account, refetchOvergoalPlayer, overgoalPlayer, isInitializing, client.game, dojoState]);

  /**
   * Reset the initialization state
   */
  const resetInitializer = useCallback(() => {
    console.log("🔄 Resetting overgoal player initializer state...");
    setIsInitializing(false);
    setInitState({
      isInitializing: false,
      error: null,
      completed: false,
      step: 'checking',
      txHash: null,
      txStatus: null
    });
  }, []);

  // Sync loading state with the store
  useEffect(() => {
    setLoading(initState.isInitializing || overgoalPlayerLoading);
  }, [initState.isInitializing, overgoalPlayerLoading, setLoading]);

  return {
    // State
    isInitializing: initState.isInitializing,
    error: initState.error,
    completed: initState.completed,
    currentStep: initState.step,
    txHash: initState.txHash,
    txStatus: initState.txStatus,
    isConnected: status === "connected",
    overgoalPlayerExists: useAppStore.getState().overgoalPlayer !== null,

    // Actions
    initializeOvergoalPlayer,
    resetInitializer
  };
};
