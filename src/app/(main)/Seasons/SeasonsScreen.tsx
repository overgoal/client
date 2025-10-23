import TeamsList from "./components/teams-list";
import CyberContainer from "../Home/components/cyber-container";
import SeasonTeamItem from "./components/team-item";
import teamsData from "./components/teams.json";

const myTeam = teamsData[0];

export default function SeasonsScreen() {
  return (
    <>
      <div className="min-h-screen w-scren flex items-center flex-col justify-center bg-black backdrop-blur-sm p-2 gap-4">
        <div className="w-full flex flex-row items-center justify-between my-4 mr-2">
          <div className="flex flex-row items-center justify-center gap-2">
            <div></div>
            <div className="text-white text-sm font-orbitron font-medium">
              Season 2
            </div>
          </div>
          <CyberContainer className="!w-1/3 !h-1/3 px-3 flex flex-row items-center justify-between  ">
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
            <h2 className="text-white text-sm  font-orbitron font-medium">
              5000
            </h2>
          </CyberContainer>
        </div>
        <div className="w-full flex flex-row items-center justify-center gap-2">
          <div className="flex flex-col items-center justify-center max-w-2/3 w-full">
            <div className="text-white text-sm font-orbitron font-medium">
              Season ends:
            </div>
            <div className="text-overgoal-blue text-lg font-orbitron font-medium">
              3d 15h 21m
            </div>
          </div>
          <div className="text-white text-sm font-orbitron font-medium max-w-1/3 w-full">
            Season 2
          </div>
        </div>
        <TeamsList />
      </div>
      <div className="fixed  bottom-0 w-full bg-black max-h-[120px] h-full !z-100 flex items-center justify-center">
        <SeasonTeamItem color="purple" {...myTeam} index={1} />
      </div>
    </>
  );
}
