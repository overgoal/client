import { Button } from "../ui/button";
import { useStarknetConnect } from "../../dojo/hooks/useStarknetConnect";
import { useCallback } from "react";
import { useCreatePlayer } from "../../dojo/hooks/useCreatePlayer";

interface LoginButtonProps {
  className?: string;
  onLoginSuccess?: () => void;
  onLoginError?: (error: Error) => void;
  playerId: string;
  autoInitializePlayer?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
}

function LoginButton({
  className = "",
  onLoginError,
  playerId,
  variant = "default",
  size = "default",
  children,
}: LoginButtonProps) {
  const { status, isConnecting, handleConnect } = useStarknetConnect();

  const { initializePlayer } = useCreatePlayer();
  const isLoading = isConnecting || status === "connecting";

  const handleClaim = useCallback(() => {
    console.log("claim playerId:", playerId);
    handleConnect()
      .then(() => {
        initializePlayer(playerId)
          .then((result) => {
            console.log("claim result:", result);
          })
          .catch((error) => {
            onLoginError?.(error);
          });
      })
      .catch((error) => {
        onLoginError?.(error);
      });
  }, []);

  return (
    <Button
      onClick={handleClaim}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </Button>
  );
}

LoginButton.displayName = "LoginButton";
export default LoginButton;
