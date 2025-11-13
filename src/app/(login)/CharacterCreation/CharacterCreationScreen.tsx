import { Button } from "../../../components/ui/button";
// import { useCreateOvergoalPlayer } from "../../../dojo/hooks/useCreateOvergoalPlayer";
import { useNavigate, useParams } from "react-router";
import { OvergoalPlayer } from "../../../lib/schema";
import useAppStore from "../../../zustand/store";
import { useState } from "react";
import { usePlayer } from "../../../dojo/hooks/usePlayer";
import { useCreatePlayer } from "../../../dojo/hooks/useCreatePlayer";
import { useAccount } from "@starknet-react/core";
import { useStarknetConnect } from "../../../dojo/hooks/useStarknetConnect";

// import { usePlayer, useSpawnPlayer} from "@universe/react-sdk";

// import useSpawnPlayer from "../../../dojo/hooks/useSpawnPlayer";

export default function CharacterCreationScreen() {
  const { playerId } = useParams();
  const navigate = useNavigate();

  const setOvergoalPlayer = useAppStore((state) => state.setOvergoalPlayer);
  const { player } = usePlayer();
  const { initializePlayer } = useCreatePlayer();

  const { status, address } = useAccount();
  const { isInitializing, txStatus } = useCreatePlayer();
  const { handleDisconnect } = useStarknetConnect();

  const isConnected = status === "connected";

  //   const { initializeOvergoalPlayer, completed } = useCreateOvergoalPlayer();

  const [isDone, setIsDone] = useState(false);

  const getStatusMessage = () => {
    if (!isConnected) return "Connect your controller to start playing";
    if (isInitializing) {
      if (txStatus === "PENDING") return "Creating player on blockchain...";
      if (txStatus === "SUCCESS") return "Player created successfully!";
      return "Initializing player...";
    }
    if (player) return "Ready to play!";
    return "Preparing...";
  };

  const getPlayerStatus = () => {
    if (!isConnected) return { color: "bg-red-500", text: "Disconnected" };
    if (isInitializing) return { color: "bg-yellow-500", text: "Creating..." };
    if (player) return { color: "bg-green-500", text: "Ready" };
    return { color: "bg-yellow-500", text: "Loading..." };
  };

  //Fetch id from url and create overgoal player,
  const handleCreateOvergoalPlayer = () => {
    const playerIdNumber = parseInt(playerId || "0");

    // mock create overgoal player
    const overgoalPlayer: OvergoalPlayer = {
      player_id: playerIdNumber.toString(),
      goal_currency: 0,
      energy: 0,
      speed: 0,
      dribble: 0,
      pass: 0,
      vision: 0,
      freekick: 0,
      strength: 0,
      profile_image: null,
      is_retired: false,
    };
    setOvergoalPlayer(overgoalPlayer);

    console.log("Overgoal player created", overgoalPlayer);
    console.log("Player id", playerId);

    setIsDone(true);

    // Create overgoal player in the contracts
    // initializeOvergoalPlayer(playerIdNumber).then((result) => {
    //   if (result.success) {
    //     navigate("/home");
    //   }
    // });
  };

  const handleContinue = () => {
    navigate("/");
  };

  const handleSpawnPlayer = () => {
    initializePlayer(playerId || "").then((result) => {
      console.log("Spawn player result", result);
    });
  };

  const onHandleDisconnect = () => {
    handleDisconnect();
    navigate("/login");
  };

  const playerStatus = getPlayerStatus();
  const statusMessage = getStatusMessage();

  return (
    <div className="h-screen w-screen px-12 flex flex-col items-center justify-between py-12 gap-5 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <h2 className="text-2xl font-bold text-white">Character Creation</h2>

      {address && (
        <span className="text-slate-300 font-mono text-sm bg-slate-800/50 px-3 py-1 rounded-lg">
          {address}
        </span>
      )}

      <Button variant="outline" onClick={onHandleDisconnect}>
        <span className="text-lg font-bold text-white">Disconnect</span>
      </Button>

      <div className="text-white">PLAYER {player?.name}</div>
      <div className={playerStatus.color}>{playerStatus.text}</div>
      <div className="text-white">{statusMessage}</div>

      <div className="flex flex-col gap-4">
        <Button variant="outline" onClick={handleCreateOvergoalPlayer}>
          <span className="text-lg font-bold text-white">Create</span>
        </Button>

        <Button variant="outline" disabled={!isDone} onClick={handleContinue}>
          <span className="text-lg font-bold text-white">Continue</span>
        </Button>

        <div className="text-white">PLAYER {player?.name}</div>

        <Button variant="outline" onClick={handleSpawnPlayer}>
          <span className="text-lg font-bold text-white">Create Player</span>
        </Button>
      </div>
    </div>
  );
}
