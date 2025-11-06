import { cn } from "../../../../utils/utils";
type PreMatchTeamProps = {
  teamName: string;
  teamImage: string;
  side: "left" | "right";
  isMyTeam?: boolean;
};

export default function PreMatchTeam({
  teamName,
  side,
  isMyTeam,
}: PreMatchTeamProps) {
  return (
    <div className={cn("w-full relative   h-full min-w-[90px] min-h-[300px] ")}>
      <div
        className="absolute inset-0 bg-contain bg-no-repeat bg-center z-0 w-full h-full "
        style={{
          backgroundImage: isMyTeam
            ? "url('/pre-match/myTeamContainer.svg')"
            : "url('/pre-match/enemyTeamContainer.svg')",
        }}
      />

      <div
        className={cn(
          "w-full h-full flex flex-col items-center justify-center min-h-[250px] gap-8 relative z-10 pt-2",
          side === "left" ? "pr-5" : "pl-5",
        )}
      >
        <div className="w-full h-full flex items-center justify-center max-w-[60px] max-h-[60px]">
          <img
            src={"/teams/dojoUnited.png"}
            alt="team"
            className="w-full h-full object-cover"
          />
        </div>
        <h1
          className={cn(
            "text-white text-lg font-bold font-orbitron uppercase text-center leading-6 mx-auto  break-words max-w-[140px]",
            isMyTeam ? "text-overgoal-lime-green" : "text-overgoal-error",
          )}
        >
          {teamName}
        </h1>
      </div>
    </div>
  );
}
