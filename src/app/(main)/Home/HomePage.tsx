import { useEffect } from "react";



import { useNavigate } from "react-router";
import { usePlayer } from "../../../dojo/hooks/usePlayer";
import { useStarknetConnect } from "../../../dojo/hooks/useStarknetConnect";
import useAppStore from "../../../zustand/store";
import background from "/homepage/background.png";
import HomeMenu from "./components/menu";

export default function HomePage() {
  const navigate = useNavigate();
  const { player } = usePlayer();
  const { handleDisconnect } = useStarknetConnect();
  const resetStore = useAppStore((state) => state.resetStore);

  useEffect(() => {
    console.log(player);
  }, [player]);

  const handleDisconnectAction = () => {
    handleDisconnect();
    navigate("/login");
    resetStore();
  };

  return (
    <div className="w-screen h-screen relative">
      <img
        src={background}
        alt="background"
        className="inset-0  absolute top-0  left-0 w-full h-full object-cover"
        width={1000}
        height={1000}
      />
      <HomeMenu />

     
    </div>
  );
}
