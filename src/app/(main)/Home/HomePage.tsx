import { useEffect, useMemo } from "react";

// import { useNavigate } from "react-router";
import { usePlayer } from "../../../dojo/hooks/usePlayer";
// import { useStarknetConnect } from "../../../dojo/hooks/useStarknetConnect";
// import useAppStore from "../../../zustand/store";
import background from "/homepage/background.png";
import HomeMenu from "./components/menu";
import Scene from "../../../components/webgl/Scene";

export default function HomePage() {
  // const navigate = useNavigate();
  const { player } = usePlayer();
  // const { handleDisconnect } = useStarknetConnect();
  // const resetStore = useAppStore((state) => state.resetStore);

  useEffect(() => {
    console.log(player);
  }, [player]);

  // Memoize static styles to prevent re-creation
  const containerStyles = useMemo(
    () => ({
      touchAction: "none" as const,
    }),
    []
  );

  // const handleDisconnectAction = () => {
  //   handleDisconnect();
  //   navigate("/login");
  //   resetStore();
  // };

  return (
    <div className="w-full min-h-dvh h-full relative  " style={containerStyles}>
      {/* Background Image Layer */}
      <img
        src={background}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        width={1000}
        height={1000}
      />


      {/* 3D Scene Layer - positioned behind UI */}
      <div className="absolute inset-0 z-20">
        <Scene />
      </div>

      {/* UI Overlay Layer - positioned on top */}
      <div className="relative h-dvh  z-20 ">
        <div className=" h-full  min-h-dvh">
          <HomeMenu />
        </div>
      </div>
    </div>
  );
}
