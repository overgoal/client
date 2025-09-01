import { Button } from "../../../components/ui/button";
// import { useCreateOvergoalPlayer } from "../../../dojo/hooks/useCreateOvergoalPlayer";
import { useNavigate, useParams } from "react-router";
import { OvergoalPlayer } from "../../../lib/schema";
import useAppStore from "../../../zustand/store";
import { useState } from "react";

export default function CharacterCreationScreen() {
  //overgoal playe fetchs the overgoal player data from the overgoal player contract
  //   const { overgoalPlayer, isLoading } = useOvergoalPlayer();
  // create overgoal player
  const { playerId } = useParams();
  const navigate = useNavigate();

  const setOvergoalPlayer = useAppStore((state) => state.setOvergoalPlayer);

//   const { initializeOvergoalPlayer, completed } = useCreateOvergoalPlayer();

  const [isDone, setIsDone] = useState(false);

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

  return (
    <div className="h-screen w-screen px-12 flex flex-col items-center justify-between py-12 gap-5 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <h2 className="text-2xl font-bold text-white">Character Creation</h2>

      <div className="flex flex-row gap-4">
        <Button variant="outline" onClick={handleCreateOvergoalPlayer}>
          <span className="text-lg font-bold text-white">Create</span>
        </Button>

        <Button
          variant="outline"
          disabled={!isDone}
          onClick={handleContinue}
        >
          <span className="text-lg font-bold text-white">Continue</span>
        </Button>
      </div>
    </div>
  );
}
