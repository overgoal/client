import { useParams } from "react-router";
import { useState, useEffect } from "react";
import ClaimScene from "../claim/ClaimScene";
import CyberContainer from "../Home/components/cyber-container";
import LoginSuccessDialog from "../../../components/common/LoginSuccessDialog";
import { useLoginWithUser } from "../../../dojo/hooks/useLoginWithUser";
import { useCreateOrGetUser } from "../../../dojo/hooks/useCreateOrGetUser";
import { Loader2, LogOut, CheckCircle, UserPlus } from "lucide-react";
import { PlayerData } from "../../../components/models/ChangeableModels";

const ClaimScreen = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Wallet connection hook
  const { status, address, handleLogin, handleLogout } = useLoginWithUser();

  // User creation hook (auto-initializes when connected + username available)
  const {
    isInitializing,
    error,
    completed,
    txHash,
    txStatus,
    username,
    resetInitializer
  } = useCreateOrGetUser(player?.player_name);

  const isConnected = status === "connected";
  const isLoading = status === "connecting" || isInitializing;

  // Fetch player data on mount
  useEffect(() => {
    const fetchPlayerData = async () => {
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("📦 [INIT] Fetching player data for linkID:", id);
      
      try {
        const res = await fetch("/players.json");
        const data = await res.json();

        const foundPlayer = data.find(
          (p: PlayerData) => p.linkID.toString() === id?.toString(),
        );
        
        if (foundPlayer) {
          console.log("✅ [INIT] Player data loaded");
          console.log("📍 Player name:", foundPlayer.player_name);
          console.log("📍 Link ID:", foundPlayer.linkID);
          setPlayer(foundPlayer);
        } else {
          console.warn("⚠️ [INIT] Player not found for linkID:", id);
        }
      } catch (error) {
        console.error("❌ [INIT] Failed to fetch player data:", error);
      }
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    };

    if (id) {
      fetchPlayerData();
    }
  }, [id]);

  // Show success dialog when user creation completes successfully
  useEffect(() => {
    if (completed && username) {
      console.log("✅ [SUCCESS] User initialized, showing success dialog");
      setShowSuccessDialog(true);
    }
  }, [completed, username]);

  // Handle closing the success dialog
  const handleCloseDialog = () => {
    console.log("🔒 Closing success dialog");
    setShowSuccessDialog(false);
  };

  // Get button state and text
  const getButtonContent = () => {
    if (isLoading) {
      return (
        <>
          <Loader2 className="mr-3 h-8 w-8 animate-spin" />
          <span>{isInitializing ? "Creating User..." : "Connecting..."}</span>
        </>
      );
    }
    
    if (completed && username) {
      return (
        <>
          <CheckCircle className="mr-3 h-8 w-8" />
          <span>Ready!</span>
        </>
      );
    }
    
    if (isConnected) {
      return (
        <>
          <UserPlus className="mr-3 h-8 w-8" />
          <span>Initializing...</span>
        </>
      );
    }
    
    return <span>Claim</span>;
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <img
        src="/backgrounds/bg-card.png"
        alt="background"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      
      {/* Debug Panel */}
      <div className="absolute left-4 top-4 z-9999 max-w-md rounded-lg border border-yellow-500 bg-black/80 p-4 font-mono text-xs text-yellow-300">
        <div className="font-bold text-yellow-400 mb-2">🔍 Debug Info:</div>
        <div>Status: {status}</div>
        <div>Address: {address ? `${address.slice(0, 10)}...${address.slice(-6)}` : 'null'}</div>
        <div>Player Name: {player?.player_name || 'null'}</div>
        <div>Initializing: {isInitializing ? 'true' : 'false'}</div>
        <div>Username: {username || 'null'}</div>
        <div>Completed: {completed ? 'true' : 'false'}</div>
        <div>TX Hash: {txHash ? `${txHash.slice(0, 10)}...` : 'null'}</div>
        <div>TX Status: {txStatus || 'null'}</div>
        <div>Error: {error ? 'YES' : 'NO'}</div>
      </div>
      
      {/* Logout Button - Only show when connected */}
      {isConnected && (
        <button
          onClick={() => {
            console.log("🔌 Logout clicked, resetting state");
            resetInitializer();
            handleLogout();
          }}
          className="absolute right-4 top-4 z-9999 flex items-center gap-2 rounded-lg border border-red-400/40 bg-black/80 px-4 py-2 text-red-400 transition-all hover:border-red-400/60 hover:bg-red-500/10 hover:text-red-300"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-semibold">Logout</span>
        </button>
      )}
      
      <div className="absolute inset-0 top-[90%] left-1/2 z-100 flex h-1/4 w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-linear-to-b from-transparent to-black">
        <CyberContainer className="airstrike-normal flex h-20 w-[80%] items-center justify-center bg-transparent text-center text-5xl font-bold text-white">
          <button
            onClick={() => {
              if (!isConnected && !isLoading) {
                console.log("🎮 Claim button clicked, starting login flow");
                handleLogin();
              }
            }}
            disabled={isLoading || completed}
            className="airstrike-normal flex items-center justify-center text-4xl font-bold text-white transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {getButtonContent()}
          </button>
        </CyberContainer>
      </div>

      {/* Error Display */}
      {error && (
        <div className="absolute left-1/2 top-4 z-9997 w-[90%] max-w-md -translate-x-1/2">
          <div className="rounded-lg border border-red-500 bg-red-500/20 p-4 text-center">
            <p className="font-semibold text-red-400">{error}</p>
            <button
              onClick={resetInitializer}
              className="mt-2 text-sm text-red-300 underline hover:text-red-200"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      {address && username && (
        <LoginSuccessDialog
          isOpen={showSuccessDialog}
          onClose={handleCloseDialog}
          address={address}
          username={username}
        />
      )}

      <ClaimScene playerLinkId={id || ""} />
    </div>
  );
};

export default ClaimScreen;
