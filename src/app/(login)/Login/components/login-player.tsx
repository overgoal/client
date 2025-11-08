// import { Button } from "../../../../components/ui/button";
import { useStarknetConnect } from "../../../../dojo/hooks/useStarknetConnect";
import { usePlayer } from "../../../../dojo/hooks/usePlayer";
// import { useAccount } from "@starknet-react/core";
import { Loader2, Wallet } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAppStore from "../../../../zustand/store";
import { Button } from "../../../../components/ui/button";
import { useCreatePlayer } from "../../../../dojo/hooks/useCreatePlayer";
// import { useCreatePlayer } from "../../../../dojo/hooks/useCreatePlayer";

export function LoginPlayer() {
  const { status, isConnecting, handleConnect } = useStarknetConnect();

  // const { player, isFetched } = usePlayer();
  const { initializePlayer, isInitializing, txStatus } = useCreatePlayer();

  // const {
  //   initializePlayer,
  //   isInitializing,
  //   txStatus,
  // } = useSpawnPlayer();

  //Hook to access the connector
  // const { connector } = useAccount();
  const navigate = useNavigate();
  const isConnected = status === "connected";
  const isLoading = isConnecting || status === "connecting" || isInitializing;

  // 🎮 Auto-initialize player after connecting controller
  useEffect(() => {
    //if the player is already stored, navigate to the home page

    if (isConnected && !isInitializing && !isLoading) {
      console.log(
        "🎮 Controller connected but no player found, auto-initializing...",
      );
      setTimeout(() => {
        initializePlayer().then((result) => {
          console.log("🎮 Auto-initialization result:", result);
          // navigate("/");
        });
      }, 500);
    }
  }, [isConnected, isInitializing, isLoading, initializePlayer]);

  // useEffect(() => {
  //   // Overgoal player exists, navigate to home page
  //   if (overgoalPlayer) navigate("/");

  //   // Player exists but overgoal player does not exist, navigate to character creation page
  //   if (storedPlayer && !overgoalPlayer)
  //     navigate("/character-creation/" + storedPlayer.id);

  //   // Player does not exist, create player and navigate to character creation page

  //   if (isFetched && !player) {
  //     //simulate create player and save to store
  //     const newPlayer: Player = {
  //       id: "1",
  //       user_id: "1",
  //       name: "Player",
  //       created_at: new Date(),
  //       last_updated_at: new Date(),
  //       last_login_at: new Date(),
  //       fame: 0,
  //       charisma: 100,
  //       stamina: 100,
  //       intelligence: 100,
  //       leadership: 100,
  //       universe_currency: 100,
  //     };

  //     //  initializePlayer(); with this we will call the world api to create a new player

  //     setPlayer(newPlayer);
  //     navigate("/character-creation/" + newPlayer.id);
  //   }
  // }, [player, isFetched, storedPlayer]);

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

  // const onHandleConnect = () => {
  //   //login
  //   //check ig player exists
  //   //if player exists, navigate to the home page
  //   //if player does not exist, navigate to creating player page

  //   handleConnect();
  // };

  return (
    <div className="mb-8 rounded-2xl p-6">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-4">
          <Button
            onClick={handleConnect}
            disabled={isLoading}
            className="bg-[#003a4f] px-6 py-3 font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isConnecting || status === "connecting" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Controller
              </>
            )}
          </Button>
        </div>
      </div>

      {txStatus === "PENDING" && (
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating player on blockchain...
        </div>
      )}
      {txStatus === "SUCCESS" && (
        <div className="flex flex-col items-center justify-center">
          User created successfully!
        </div>
      )}
      {txStatus === "REJECTED" && (
        <div className="flex flex-col items-center justify-center">
          Player creation failed!
        </div>
      )}
    </div>
  );
}
