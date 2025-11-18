import { useEffect, useMemo, useState } from "react";

// import { useNavigate } from "react-router";
// import { useStarknetConnect } from "../../../dojo/hooks/useStarknetConnect";
// import useAppStore from "../../../zustand/store";
import HomeMenu from "./components/menu";
import Scene from "../../../components/webgl/Scene";
import LoadingScreen from "../../../components/loader/LoadingScreen";

export default function HomePage() {
  // const navigate = useNavigate();
  // const { player } = usePlayer();
  // const { handleDisconnect } = useStarknetConnect();
  // const resetStore = useAppStore((state) => state.resetStore);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState({
    background: false,
    scene: false,
  });

  

  // Track when all assets are loaded
  useEffect(() => {
    if (assetsLoaded.scene) {
      setLoadingProgress(100);
      // Add a small delay before hiding the loader for smooth transition
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // Update progress based on what's loaded
      const progress =
        (Object.values(assetsLoaded).filter(Boolean).length / 2) * 100;
      setLoadingProgress(progress);
    }
  }, [assetsLoaded]);

  const handleSceneLoadComplete = () => {
    setAssetsLoaded((prev) => ({ ...prev, scene: true }));
  };

  // Memoize static styles to prevent re-creation
  const containerStyles = useMemo(
    () => ({
      touchAction: "none" as const,
    }),
    [],
  );

  return (
    <div className="relative h-dvh w-full" style={containerStyles}>
      {/* Loading Screen Overlay */}
      <LoadingScreen isLoading={isLoading} progress={loadingProgress} />

      {/* 3D Scene Layer - positioned behind UI */}
      <div className="pointer-events-auto absolute inset-0 z-20 ">
        <Scene onLoadComplete={handleSceneLoadComplete} />
      </div>

      {/* UI Overlay Layer - positioned on top */}
      <div className="relative z-30 h-lvh">
        <div className="h-dvh">
          <HomeMenu />
        </div>
      </div>
    </div>
  );
}
