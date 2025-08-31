import { useEffect } from "react";

import { Button } from "../../../components/ui/button";

import Scene from "../../../components/webgl/Scene";

import { useNavigate } from "react-router";
import { usePlayer } from "../../../dojo/hooks/usePlayer";
import { useStarknetConnect } from "../../../dojo/hooks/useStarknetConnect";

export default function HomePage() {
const navigate = useNavigate();
  const { player } = usePlayer();
  const {handleDisconnect} = useStarknetConnect();


  useEffect(() => {
    console.log(player);
  }, [player]); 

  const handleDisconnectAction = () => {
    handleDisconnect();
    navigate("/login");
  }

  return (
    <div className="w-screen h-screen">
      <div className="absolute  w-screen top-0  py-2  flex items-center justify-between px-12 py-4 z-100 text-white ">
        <h1 className="text-2xl font-bold">Welcome, {player?.name}</h1>
        <Button variant="outline" className="px-4 py-2 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-500 hover:text-red-400 transition-all duration-300" onClick={handleDisconnectAction}>Disconnect</Button>
      </div>
      <Scene />
      <div className="absolute bottom-0  left-0 w-screen py-4 flex items-center justify-center z-100 text-white">
        <h1 className="text-4xl font-bold">Play Now</h1>
      </div>
    </div>
  );
}
