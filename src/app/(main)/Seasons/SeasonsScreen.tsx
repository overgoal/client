import { useEffect, useState } from "react";
import TeamsList from "./components/teams-list";
import CyberContainer from "../Home/components/cyber-container";
import SeasonTeamItem from "./components/team-item";
import teamsData from "./components/teams.json";
import { BackButton } from "../../../components/ui/back-button";
import { Countdown } from "../../../components/ui/countdown";
import { SEASON_COUNTDOWN_TARGET_DATE } from "../Home/constants";
import useAppStore from "../../../zustand/store";
import playersData from "../../../../data/players.json";

export default function SeasonsScreen() {
  const { claimedPlayerLinkId } = useAppStore();
  const [playerTeam, setPlayerTeam] = useState(teamsData[0]); // Default to first team

  useEffect(() => {
    if (claimedPlayerLinkId) {
      // Find the player using the linkID
      const claimedPlayer = playersData.find(
        (player) => player.linkID === claimedPlayerLinkId,
      );
      
      if (claimedPlayer && claimedPlayer.team_id) {
        // Find the team using the player's team_id
        const team = teamsData.find(
          (team) => team.id === claimedPlayer.team_id,
        );
        
        if (team) {
          setPlayerTeam(team);
        }
      }
    }
  }, [claimedPlayerLinkId]);

  return (
    <>
      <div className="w-scren flex min-h-screen flex-col items-center justify-center gap-4 bg-black p-2 backdrop-blur-sm">
        <div className="my-4 mr-2 flex w-full flex-row items-center justify-between">
          <BackButton className="h-12 w-12" />
          <div className="flex flex-row items-center justify-center gap-2">
            <div></div>
            <div className="font-orbitron text-sm font-medium text-white">
              Season 0
            </div>
          </div>
          <CyberContainer className="flex !h-1/3 !w-1/3 flex-row items-center justify-between px-3">
            <svg
              width="14"
              height="11"
              viewBox="0 0 14 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8843 3.66923L10.6168 0.15C10.5271 0.0538462 10.4006 0 10.266 0H3.73511C3.6005 0 3.47404 0.0538462 3.38429 0.15L0.116812 3.66923C-0.0422787 3.83846 -0.0381994 4.09615 0.124971 4.25769L6.65994 10.8577C6.83534 11.0346 7.12905 11.0462 7.32078 10.8808C7.32893 10.8731 7.33709 10.8654 7.34525 10.8577L13.8802 4.25769C14.0434 4.09231 14.0475 3.83846 13.8884 3.66923H13.8843ZM12.5055 3.51923H10.0335L7.93266 0.880769H10.0539L12.5055 3.51923ZM3.88604 4.4L5.6442 8.54231L1.54047 4.4H3.88196H3.88604ZM9.11157 4.4L7.00259 9.37692L4.89362 4.4H9.11565H9.11157ZM5.13429 3.51923L7.00259 1.17308L8.87089 3.51923H5.13837H5.13429ZM10.1191 4.4H12.4606L8.36098 8.54231L10.1191 4.4ZM3.94723 0.880769H6.06844L3.96763 3.51923H1.4956L3.94723 0.880769Z"
                fill="#00EDF7"
              />
            </svg>
            <h2 className="font-orbitron text-sm font-medium text-white">
              5000
            </h2>
          </CyberContainer>
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-2">
          <div className="flex w-full max-w-2/3 flex-col items-center justify-center">
            <div className="font-orbitron text-sm font-medium text-white">
              Season starts:
            </div>
            <div className="text-overgoal-blue font-orbitron text-lg font-medium">
              <Countdown targetDate={SEASON_COUNTDOWN_TARGET_DATE} />
            </div>
          </div>
          <div className="font-orbitron w-full max-w-1/3 text-sm font-medium text-white">
            Season 0
          </div>
        </div>
        <TeamsList />
      </div>
      <div className="fixed bottom-0 !z-100 flex h-full max-h-[120px] w-full items-center justify-center bg-black">
        <SeasonTeamItem color="purple" {...playerTeam} index={1} />
      </div>
    </>
  );
}
