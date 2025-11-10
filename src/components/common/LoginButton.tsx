import { Loader2, Wallet } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { useStarknetConnect } from "../../dojo/hooks/useStarknetConnect";

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

  const isConnected = status === "connected";
  const isLoading = isConnecting || status === "connecting";

  // Auto-initialize player after connecting controller
  useEffect(() => {
    if (isConnected && !isLoading && autoInitializePlayer) {
      console.log(
        "🎮 Controller connected but no player found, auto-initializing...",
      );
    }
  }, [
    isConnected,
    isLoading,
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
