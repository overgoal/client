import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ClaimScene from "../claim/ClaimScene";
import LoginButton from "../../../components/common/LoginButton";
import LoadingScreen from "../../../components/loader/LoadingScreen";
import { useCallback } from "react";
import { cn } from "../../../utils/utils";
import { GlitchText } from "../../../components/ui/glitch-text";
import { PlayerData } from "../../../components/models/PlayerModel";

const getCategoyContainer = (category: string) => {
  switch (category) {
    case "bronze":
      return "/claim/claim-container-bronze.webp";
    case "gold":
      return "/claim/claim-container-gold.webp";
    case "platinum":
      return "/claim/claim-container-platinum.webp";
  }
};

const getPlayerTeamImage = (team: number) => {
  switch (team) {
    case 0:
      return "/teams/Cartridge City.webp";
    case 1:
      return "/teams/dojoUnited.webp";
    case 2:
      return "/teams/Nova United.webp";
    case 3:
      return "/teams/Drakon core.webp";
  }
};

const ClaimScreen = () => {
  const { id } = useParams();

  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState({
    background: false,
    scene: false,
  });
  // Track when all assets are loaded
  useEffect(() => {
    if (assetsLoaded.background && assetsLoaded.scene) {
      setLoadingProgress(100);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      const progress =
        (Object.values(assetsLoaded).filter(Boolean).length / 2) * 100;
      setLoadingProgress(progress);
    }
  }, [assetsLoaded]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/players.json");
        const data = await res.json();

        const player = data.find(
          (player: PlayerData) =>
            player.linkID.toString() === id?.toString(),
        );
        setPlayer(player);
        console.log(player, "player");
      } catch (error) {
        console.error("Failed to fetch player data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleBackgroundLoad = useCallback(() => {
    setAssetsLoaded((prev) => ({ ...prev, background: true }));
  }, []);

  const handleSceneLoadComplete = useCallback(() => {
    setAssetsLoaded((prev) => ({ ...prev, scene: true }));
  }, []);

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      {/* Loading Screen Overlay */}
      <LoadingScreen isLoading={isLoading} progress={loadingProgress} />

      <img
        src="/claim/claims-bg.webp"
        alt="background"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        onLoad={handleBackgroundLoad}
      />

      <div className="airstrike-normal mt-18 w-full text-center">
        <img
          src={getCategoyContainer(player?.player_category || "bronze")}
          alt=""
          className="absolute top-10 left-0 z-20 h-25 w-full"
        />
        <img
          src="/claim/claim-container-gradient.webp"
          alt=""
          className="absolute top-10 left-0 z-10 h-24 w-full"
        />
        <GlitchText
          text={player?.player_name || ""}
          className="z-10 text-3xl"
        />
        <img
          src={getPlayerTeamImage(player?.team_id || 0)}
          alt=""
          className={cn(
            "absolute top-30 left-1/2 z-20 h-20 w-20 -translate-x-1/2",
            player?.team_id === 3 || player?.team_id === 1 ? "h-18 w-16" : "",
          )}
        />
      </div>
      <div className="absolute inset-0 top-[90%] left-1/2 z-90 flex h-1/4 w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div className="flex h-24 w-full items-center justify-center bg-[url('/common/button-container.webp')] bg-contain bg-center bg-no-repeat">
          <LoginButton className="airstrike-normal flex font-bold text-white hover:scale-105 hover:bg-transparent">
            <span className="airstrike-normal text-5xl">Claim</span>
          </LoginButton>
        </div>
      </div>
      <ClaimScene
        playerLinkId={id || ""}
        onLoadComplete={handleSceneLoadComplete}
      />
    </div>
  );
};

export default ClaimScreen;
