import { useState, useCallback, useEffect } from "react";
import { useAccount } from "@starknet-react/core";
import { Account } from "starknet";
import { useDojoSDK } from "@dojoengine/sdk/react";
import { useStarknetConnect } from "./useStarknetConnect";

// Types
interface InitializeState {
  isInitializing: boolean;
  error: string | null;
  completed: boolean;
  step: 'idle' | 'connecting' | 'creating' | 'success';
  txHash: string | null;
  txStatus: 'PENDING' | 'SUCCESS' | 'REJECTED' | null;
}

interface InitializeResponse {
  success: boolean;
  userExists: boolean;
  transactionHash?: string;
  error?: string;
}

/**
 * Hook to create or get a user after wallet connection
 * Similar to useSpawnPlayer but for User model
 * 
 * Flow:
 * 1. Connect wallet via Cartridge Controller
 * 2. After connection, call with username from player data
 * 3. Call create_or_get_user on Universe contract
 * 4. Return success state
 */
export const useCreateOrGetUser = (playerUsername?: string) => {
  const { client } = useDojoSDK();
  const { account } = useAccount();
  const { status, address } = useStarknetConnect();

  // Local state
  const [initState, setInitState] = useState<InitializeState>({
    isInitializing: false,
    error: null,
    completed: false,
    step: 'idle',
    txHash: null,
    txStatus: null
  });

  // Tracking if we are initializing
  const [isInitializing, setIsInitializing] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  /**
   * Creates or gets a user with the provided username
   */
  const initializeUser = useCallback(async (usernameParam: string): Promise<InitializeResponse> => {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🎮 [STEP 1] Starting user initialization");
    console.log("📍 Username param:", usernameParam);

    // Prevent multiple executions
    if (isInitializing) {
      console.warn("⚠️ Already initializing, skipping");
      return { success: false, userExists: false, error: "Already initializing" };
    }

    setIsInitializing(true);

    // Validation: Check that the controller is connected
    if (status !== "connected") {
      const error = "Controller not connected";
      console.error("❌ [STEP 1] Validation failed:", error);
      setInitState(prev => ({ ...prev, error, step: 'idle' }));
      setIsInitializing(false);
      return { success: false, userExists: false, error };
    }

    // Validation: Check that the account exists
    if (!account || !address) {
      const error = "No account or address found";
      console.error("❌ [STEP 1] Validation failed:", error);
      setInitState(prev => ({ ...prev, error, step: 'idle' }));
      setIsInitializing(false);
      return { success: false, userExists: false, error };
    }

    console.log("✅ [STEP 1] Validation passed");
    console.log("📍 Account address:", address);

    try {
      // Start initialization process
      setInitState(prev => ({
        ...prev,
        isInitializing: true,
        error: null,
        step: 'creating',
        txStatus: 'PENDING'
      }));

      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("🎮 [STEP 2] Calling create_or_get_user contract");
      console.log("📍 Address:", address);
      console.log("📍 Username:", usernameParam);

      // Execute create_or_get_user transaction
      const tx = await client.game.createOrGetUser(account as Account, address, usernameParam);

      console.log("📥 [STEP 2] Transaction response:", tx);

      if (tx?.transaction_hash) {
        console.log("✅ [STEP 2] Transaction hash:", tx.transaction_hash);
        setInitState(prev => ({
          ...prev,
          txHash: tx.transaction_hash
        }));
      }

      if (tx && tx.code === "SUCCESS") {
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🎉 [STEP 3] User created/retrieved successfully!");

        setInitState(prev => ({
          ...prev,
          txStatus: 'SUCCESS'
        }));

        // Wait for the transaction to be processed
        console.log("⏳ [STEP 3] Waiting 2s for transaction to be processed...");
        await new Promise(resolve => setTimeout(resolve, 2000));

        setInitState(prev => ({
          ...prev,
          completed: true,
          isInitializing: false,
          step: 'success'
        }));

        // Set username on success
        setUsername(usernameParam);
        console.log("✅ [STEP 3] Username set:", usernameParam);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        setIsInitializing(false);
        return {
          success: true,
          userExists: false,
          transactionHash: tx.transaction_hash
        };
      } else {
        // Update transaction state to rejected
        setInitState(prev => ({
          ...prev,
          txStatus: 'REJECTED'
        }));
        throw new Error("Transaction failed with code: " + tx?.code);
      }

    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : "Failed to create/get user";

      console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.error("❌ [ERROR] Failed to initialize user");
      console.error("❌ Error message:", errorMessage);
      console.error("❌ Full error:", error);
      
      // Log detailed error data
      if (error && typeof error === 'object' && 'data' in error) {
        console.error("❌ Error data:", JSON.stringify((error as any).data, null, 2));
      }
      
      console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

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
        step: 'idle'
      }));

      setIsInitializing(false);
      return { success: false, userExists: false, error: errorMessage };
    }
  }, [status, account, address, isInitializing, client.game]);

  /**
   * Reset the initialization state
   */
  const resetInitializer = useCallback(() => {
    console.log("🔄 Resetting initializer state...");
    setIsInitializing(false);
    setUsername(null);
    setInitState({
      isInitializing: false,
      error: null,
      completed: false,
      step: 'idle',
      txHash: null,
      txStatus: null
    });
  }, []);

  // Auto-initialize when connected and username is provided
  useEffect(() => {
    const isConnected = status === "connected";
    const hasUsername = playerUsername && playerUsername.trim().length > 0;
    const shouldInitialize = !username && !initState.completed;

    console.log("🔍 Auto-init check:", {
      isConnected,
      hasUsername,
      playerUsername,
      shouldInitialize,
      currentUsername: username,
      isInitializing,
      completed: initState.completed
    });

    if (isConnected && hasUsername && shouldInitialize && !isInitializing) {
      console.log("🚀 Auto-initializing user with username:", playerUsername);
      setTimeout(() => {
        initializeUser(playerUsername).then(result => {
          console.log("🎮 Auto-initialization result:", result);
        });
      }, 500);
    }
  }, [status, playerUsername, username, initState.completed, initializeUser]);

  return {
    // State
    isInitializing: initState.isInitializing,
    error: initState.error,
    completed: initState.completed,
    currentStep: initState.step,
    txHash: initState.txHash,
    txStatus: initState.txStatus,
    isConnected: status === "connected",
    username,

    // Actions
    initializeUser,
    resetInitializer
  };
};

