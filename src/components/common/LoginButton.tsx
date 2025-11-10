import { Loader2, Wallet } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { useStarknetConnect } from "../../dojo/hooks/useStarknetConnect";
import { useCreatePlayer } from "../../dojo/hooks/useCreatePlayer";

interface LoginButtonProps {
  className?: string;
  onLoginSuccess?: () => void;
  onLoginError?: (error: Error) => void;
  autoInitializePlayer?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
}

function LoginButton({
  className = "",
  onLoginSuccess,
  onLoginError,
  autoInitializePlayer = true,
  variant = "default",
  size = "default",
  children,
}: LoginButtonProps) {
  const { status, isConnecting, handleConnect } = useStarknetConnect();
  const { initializePlayer, isInitializing, txStatus } = useCreatePlayer();

  const isConnected = status === "connected";
  const isLoading = isConnecting || status === "connecting" || isInitializing;

  // Auto-initialize player after connecting controller
  useEffect(() => {
    if (isConnected && !isInitializing && !isLoading && autoInitializePlayer) {
      console.log(
        "🎮 Controller connected but no player found, auto-initializing...",
      );
      setTimeout(() => {
        initializePlayer()
          .then((result) => {
            console.log("🎮 Auto-initialization result:", result);
            if (onLoginSuccess) {
              onLoginSuccess();
            }
          })
          .catch((error) => {
            console.error("🎮 Auto-initialization error:", error);
            if (onLoginError) {
              onLoginError(error);
            }
          });
      }, 500);
    }
  }, [
    isConnected,
    isInitializing,
    isLoading,
    initializePlayer,
    autoInitializePlayer,
    onLoginSuccess,
    onLoginError,
  ]);

  const getButtonContent = () => {
    if (isConnecting || status === "connecting") {
      return (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      );
    }

    if (isInitializing || txStatus === "PENDING") {
      return (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating Player...
        </>
      );
    }

    if (txStatus === "SUCCESS") {
      return <>Player Created!</>;
    }

    if (txStatus === "REJECTED") {
      return <>Connection Failed</>;
    }

    if (children) {
      return children;
    }

    return (
      <>
        <Wallet className="mr-2 h-4 w-4" />
        Connect Controller
      </>
    );
  };

  return (
    <Button
      onClick={handleConnect}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={className}
    >
      {getButtonContent()}
    </Button>
  );
}

LoginButton.displayName = "LoginButton";
export default LoginButton;
