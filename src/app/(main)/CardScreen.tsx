import { useEffect, useMemo } from "react";

// import { useNavigate } from "react-router";
// import { useStarknetConnect } from "../../../dojo/hooks/useStarknetConnect";
// import useAppStore from "../../../zustand/store";
import Scene from "../../components/webgl/Scene";

export default function CardScreen() {
  // const navigate = useNavigate();
  // const { handleDisconnect } = useStarknetConnect();
  // const resetStore = useAppStore((state) => state.resetStore);

  

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
    <div className="w-[536px] h-[760px]  relative  overflow-hidden " style={containerStyles}>
      {/* Background Image Layer */}
      <img
        src={"/backgrounds/bg-card.png"}
        alt="background"
        className="absolute  inset-0 w-full h-full object-cover z-0"
        width={1000}
        height={1000}
      />

      {/* 3D Scene Layer - positioned behind UI */}
      <div className="absolute inset-0 z-20 pointer-events-auto">
        <Scene />
      </div>

    </div>
  );
}
