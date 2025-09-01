import { Button } from "../../../../components/ui/button";
import { useStarknetConnect } from "../../../../dojo/hooks/useStarknetConnect";
// import { useSpawnPlayer } from "../dojo/hooks/useSpawnPlayer";
import { usePlayer } from "../../../../dojo/hooks/usePlayer";
// import { useAccount } from "@starknet-react/core";
import { Loader2, Wallet } from "lucide-react";
import {  useEffect } from "react";
import { useNavigate } from "react-router";
import useAppStore from "../../../../zustand/store";
import { Player } from "../../../../lib/schema";
import { useCreatePlayer } from "../../../../dojo/hooks/useCreatePlayer";

export function LoginPlayer() {
  const { status, isConnecting, handleConnect } = useStarknetConnect();

  const { player, isLoading: playerLoading, isFetched } = usePlayer();
  const {  initializePlayer} = useCreatePlayer();
  const storedPlayer = useAppStore((state) => state.player);
  const setPlayer = useAppStore((state) => state.setPlayer);
  const overgoalPlayer = useAppStore((state) => state.overgoalPlayer);

  // const {
  //   initializePlayer,
  //   isInitializing,
  //   txStatus,
  // } = useSpawnPlayer();

  //Hook to access the connector
  // const { connector } = useAccount();
  const navigate = useNavigate();
  const isConnected = status === "connected";
  const isLoading =
    isConnecting || status === "connecting"  || playerLoading;

  // 🎮 Auto-initialize player after connecting controller
  // useEffect(() => {

  //   //if the player is already stored, navigate to the home page
  //   if(storedPlayer !== null ) navigate("/");

  //   if (isConnected && !player && !isInitializing && !playerLoading) {
  //     console.log("🎮 Controller connected but no player found, auto-initializing...");
  //     setTimeout(() => {
  //       initializePlayer().then(result => {
  //         console.log("🎮 Auto-initialization result:", result);
  //         navigate("/");
  //       });
  //     }, 500);
  //   }
  // }, [isConnected, player, isInitializing, playerLoading, initializePlayer]);

useEffect(() => {

  // Overgoal player exists, navigate to home page
  if(overgoalPlayer) navigate("/");

  // Player exists but overgoal player does not exist, navigate to character creation page
  if(storedPlayer && !overgoalPlayer) navigate("/character-creation/" + storedPlayer.id);

  // Player does not exist, create player and navigate to character creation page

  if(isFetched && isConnected && !player){


    //simulate create player and save to store
    const newPlayer: Player = {
      id: "1",
      user_id: "1",
      name: "Player",
      created_at: new Date(),
      last_updated_at: new Date(),
      last_login_at: new Date(),
      fame: 0,
      charisma: 100,
      stamina: 100,
      intelligence: 100,
      leadership: 100,
      universe_currency: 100,
    };

    //  initializePlayer(); with this we will call the world api to create a new player


    setPlayer(newPlayer);
    navigate("/character-creation/" + newPlayer.id);

  } 

}, [player, isFetched, isConnected, storedPlayer]);


  // const getDeploymentType = () => {
  //   switch (import.meta.env.VITE_PUBLIC_DEPLOY_TYPE) {
  //     case "localhost":
  //       return "Localhost";
  //     case "mainnet":
  //       return "Mainnet";
  //     case "sepolia":
  //       return "Sepolia";
  //     default:
  //       return "Sepolia";
  //   }
  // };


  // const deploymentType = getDeploymentType();


  const onHandleConnect = () => {
    //login
    //check ig player exists
    //if player exists, navigate to the home page
    //if player does not exist, navigate to creating player page
  
    handleConnect();
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={onHandleConnect}
            disabled={isLoading}
            className="px-6 py-3 font-semibold transition-all duration-300 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting || status === "connecting" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4 mr-2" />
                Connect Controller
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
