import { useEffect, useMemo, useState } from "react";

// import { useNavigate } from "react-router";
import { usePlayer } from "../../../dojo/hooks/usePlayer";
// import { useStarknetConnect } from "../../../dojo/hooks/useStarknetConnect";
// import useAppStore from "../../../zustand/store";
import background from "/homepage/background.png";
import HomeMenu from "./components/menu";
import Scene from "../../../components/webgl/Scene";
import LoadingScreen from "../../../components/loader/LoadingScreen";

export default function HomePage() {
  // const navigate = useNavigate();
  const { player } = usePlayer();
  // const { handleDisconnect } = useStarknetConnect();
  // const resetStore = useAppStore((state) => state.resetStore);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState({
    background: false,
    scene: false,
  });

  useEffect(() => {
    console.log(player);
  }, [player]);

  // Track when all assets are loaded
  useEffect(() => {
    if (assetsLoaded.background && assetsLoaded.scene) {
      setLoadingProgress(100);
      // Add a small delay before hiding the loader for smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // Update progress based on what's loaded
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

  // Memoize static styles to prevent re-creation
  const containerStyles = useMemo(
    () => ({
      touchAction: "none" as const,
    }),
    [],
  );

  // const handleDisconnectAction = () => {
  //   handleDisconnect();
  //   navigate("/login");
  //   resetStore();
  // };

  return (
    <div className="w-full min-h-dvh h-full relative" style={containerStyles}>
      {/* Loading Screen Overlay */}
      <LoadingScreen isLoading={isLoading} progress={loadingProgress} />

      {/* Background Image Layer */}
      <img
        src={background}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        width={1000}
        height={1000}
        onLoad={handleBackgroundLoad}
      />

      {/* 3D Scene Layer - positioned behind UI */}
      <div className="absolute inset-0 z-20 pointer-events-auto">
        <Scene onLoadComplete={handleSceneLoadComplete} />
      </div>

      {/* UI Overlay Layer - positioned on top */}
      <div className="relative min-h-dvh z-30">
        <div className="h-dvh">
          <HomeMenu />
        </div>
      </div>
    </div>
  );
}
