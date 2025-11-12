import { useStarknetConnect } from "./useStarknetConnect";

/**
 * Simplified hook that only handles wallet connection
 * User creation is now handled by useCreateOrGetUser hook
 */
export function useLoginWithUser() {
  const { status, address, handleConnect, handleDisconnect } = useStarknetConnect();

  return {
    status,
    address,
    isConnected: status === "connected",
    handleLogin: handleConnect,
    handleLogout: handleDisconnect,
  };
}

