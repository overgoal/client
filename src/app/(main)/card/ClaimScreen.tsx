import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ClaimScene from "../claim/ClaimScene";
import LoginButton from "../../../components/common/LoginButton";
import LoadingScreen from "../../../components/loader/LoadingScreen";
import { useCallback } from "react";

const ClaimScreen = () => {
  const { id } = useParams();

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
