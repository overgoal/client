/*
  ClaimScreen - Player claiming flow
  
  Flow:
  1. User navigates to /claim/:player_id
  2. Connect with Cartridge Controller
  3. Call create_or_get_user with address and username
  4. Call claim_player with player_id
  5. Show success popup with player info
  6. Navigate to main screen
*/

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useClaimPlayer } from "../../../dojo/hooks/useClaimPlayer";
import { useStarknetConnect } from "../../../dojo/hooks/useStarknetConnect";
import { useAccount } from "@starknet-react/core";
import ClaimScene from "./ClaimScene";
import { GlitchText } from "../../../components/ui/glitch-text";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../utils/utils";
import useAppStore from "../../../zustand/store";

// Helper function to convert UUID to felt252 hex
const uuidToFelt252 = (uuid: string): string => {
  // Remove hyphens from UUID
  const hex = uuid.replace(/-/g, "");
  // Add 0x prefix
  return "0x" + hex;
};

export default function ClaimScreen() {
  const { id: player_id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { handleConnect, status } = useStarknetConnect();
  const { account } = useAccount();
  const { claimPlayer, isClaiming, error, completed, currentStep } =
    useClaimPlayer();

  const { setClaimIsClaiming, setClaimedPlayerLinkId } = useAppStore();

  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasAttemptedClaim, setHasAttemptedClaim] = useState(false);

  // Auto-claim after successful connection
  useEffect(() => {
    const autoClaim = async () => {
      if (
        status === "connected" &&
        account &&
        player_id &&
        !isClaiming &&
        !completed &&
        !hasAttemptedClaim
      ) {
        setHasAttemptedClaim(true);

        // Convert UUID to felt252 hex format
        const playerIdFelt = uuidToFelt252(player_id);
        const result = await claimPlayer(playerIdFelt);


        if (result.success) {
          // Save the claimed player's link ID to the store
          setClaimedPlayerLinkId(player_id);
          setShowSuccess(true);

          // Navigate to home after 5 seconds
          setTimeout(() => {
            navigate("/season-countdown");
          }, 5000);
        }
      }
    };

    autoClaim();
  }, [
    status,
    account,
    player_id,
    isClaiming,
    completed,
    hasAttemptedClaim,
    claimPlayer,
    navigate,
  ]);

  // Handle claim button click (for manual retry if auto-claim fails)
  const handleClaim = async () => {
    if (!player_id) {
      return;
    }

    if (status !== "connected") {
      await handleConnect();
      return;
    }

    setHasAttemptedClaim(true);

    // Convert UUID to felt252 hex format
    const playerIdFelt = uuidToFelt252(player_id);
    const result = await claimPlayer(playerIdFelt);

    console.log("🎮 Result:", result);
    console.log("🎮 Player ID:", playerIdFelt);

    setClaimIsClaiming(playerIdFelt);

    if (result.success) {
      // Save the claimed player's link ID to the store
      setClaimedPlayerLinkId(player_id);
      setShowSuccess(true);

      // Navigate to home after 5 seconds
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  };

  // Get step message
  const getStepMessage = () => {
    switch (currentStep) {
      case "connecting":
        return "Connecting to Cartridge Controller...";
      case "creating_user":
        return "Creating your account...";
      case "claiming":
        return "Claiming player...";
      case "success":
        return "Claimed successfully!";
      default:
        return "Ready to claim";
    }
  };

  // Get button text
  const getButtonText = () => {
    if (status !== "connected") return "Claim";
    if (isClaiming) return getStepMessage();
    if (completed) return "Claimed! Redirecting...";
    if (error) return "Retry Claim";
    return "Claiming...";
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-linear-to-b from-black via-purple-900/20 to-black">
      {/* 3D Player Scene */}
      <div className="absolute inset-0 z-0">
        {player_id && (
          <ClaimScene
            playerLinkId={player_id}
            onLoadComplete={() => setSceneLoaded(true)}
          />
        )}
      </div>

      {/* Loading Overlay */}
      {!sceneLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80">
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
            <GlitchText text="Loading Player..." className="text-2xl" />
          </div>
        </div>
      )}

      {/* Claim UI */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="flex h-full flex-col items-center justify-end pb-20">
          {/* Error Message */}
          {error && (
            <div className="pointer-events-auto mb-4 rounded-lg bg-red-500/90 px-6 py-3 text-white backdrop-blur-sm">
              <p className="font-bold">❌ Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}


          {/* Claim Button */}
          {!showSuccess && (
            <Button
              onClick={handleClaim}
              disabled={isClaiming || completed || !sceneLoaded}
              className={cn(
                "airstrike-normal pointer-events-auto absolute bottom-10 flex h-24 w-full items-center justify-center bg-[url('/common/button-container.webp')] bg-contain bg-center bg-no-repeat font-bold text-white disabled:opacity-100",
                getButtonText() === "Claim" ? "text-5xl" : "text-2xl",
              )}
            >
              {getButtonText()}
            </Button>
          )}

          {/* Account Info */}
          {account && status === "connected" && !isClaiming && (
            <div className="pointer-events-auto mt-4 rounded-lg bg-black/50 px-4 py-2 text-white/70 backdrop-blur-sm">
              <p className="text-xs">
                Connected: {account.address.slice(0, 6)}...
                {account.address.slice(-4)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
