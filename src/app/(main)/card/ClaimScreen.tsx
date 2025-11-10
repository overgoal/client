import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ClaimScene from "../claim/ClaimScene";
import LoginButton from "../../../components/common/LoginButton";
import CyberContainer from "../Home/components/cyber-container";
import LoadingScreen from "../../../components/loader/LoadingScreen";

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
      const progress = Object.values(assetsLoaded).filter(Boolean).length / 2 * 100;
      setLoadingProgress(progress);
    }
  }, [assetsLoaded]);

  const handleBackgroundLoad = () => {
    setAssetsLoaded(prev => ({ ...prev, background: true }));
  };

  const handleSceneLoadComplete = () => {
    setAssetsLoaded(prev => ({ ...prev, scene: true }));
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      {/* Loading Screen Overlay */}
      <LoadingScreen isLoading={isLoading} progress={loadingProgress} />

      <img
        src="/backgrounds/bg-card.webp"
        alt="background"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        onLoad={handleBackgroundLoad}
      />
      <div className="absolute inset-0 top-[90%] left-1/2 z-90 flex h-1/4 w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-linear-to-b from-transparent to-black">
        <CyberContainer className="airstrike-normal flex h-20 w-[80%] items-center justify-center bg-transparent text-center text-5xl font-bold text-white">
          <LoginButton className="airstrike-normal flex text-5xl font-bold text-white hover:scale-105 hover:bg-transparent">
            <span className="airstrike-normal text-4xl">Claim</span>
          </LoginButton>
        </CyberContainer>
      </div>
      <ClaimScene playerLinkId={id || ""} onLoadComplete={handleSceneLoadComplete} />
    </div>
  );
};

export default ClaimScreen;
