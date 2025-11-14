import { Button } from "../../../../components/ui/button";
import { useStarknetConnect } from "../../../../dojo/hooks/useStarknetConnect";
import { useAccount } from "@starknet-react/core";
import { Loader2, Wallet } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

interface LoginPlayerProps {
  className?: string;
  onLoginSuccess?: () => void;
  onLoginError?: (error: Error) => void;
}

export function LoginPlayer({
  className = "",
  onLoginSuccess,
}: LoginPlayerProps) {
  const navigate = useNavigate();
  const { status, isConnecting, handleConnect } = useStarknetConnect();
  const { account } = useAccount();
  // Use ref to track if we've already called onLoginSuccess to prevent infinite loops
  const hasCalledSuccess = useRef(false);

  const isConnected = status === "connected";
  const hasAccount = !!account;
  const isLoading = isConnecting || status === "connecting";

  // Reset success flag when connection is lost
  useEffect(() => {
    if (!isConnected) {
      hasCalledSuccess.current = false;
    } else {
      navigate("/");
    }
  }, [isConnected]);

  // Handle successful connection with useEffect to prevent infinite loops
  useEffect(() => {
    if (
      isConnected &&
      hasAccount &&
      onLoginSuccess &&
      !hasCalledSuccess.current
    ) {
      console.log(
        "🎮 Controller connected successfully, calling onLoginSuccess",
      );
      navigate("/");
      hasCalledSuccess.current = true;
    }
  }, [isConnected, hasAccount]);

  // Show different button states based on current status
  const getButtonContent = () => {
    if (isConnecting || status === "connecting") {
      return (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      );
    }

    if (isConnected && hasAccount) {
      return (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          Connected
        </>
      );
    }

    return (
      <>
        <Wallet className="mr-2 h-4 w-4" />
        Connect Controller
      </>
    );
  };

  return (
    <div className={`mb-8 rounded-2xl p-6 ${className}`}>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-4">
          <Button
            onClick={handleConnect}
            disabled={isLoading || (isConnected && !hasAccount)}
            className="bg-[#003a4f] px-6 py-3 font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {getButtonContent()}
          </Button>
        </div>
      </div>

      {/* Connection status messages */}
      {isConnected && hasAccount && (
        <div className="mt-4 flex flex-col items-center justify-center text-green-400">
          Controller connected successfully!
        </div>
      )}

      {isConnected && !hasAccount && (
        <div className="mt-4 flex flex-col items-center justify-center text-yellow-400">
          Controller connected, waiting for account...
        </div>
      )}
    </div>
  );
}
