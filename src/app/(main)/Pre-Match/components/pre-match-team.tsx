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
  teamImage,
}: PreMatchTeamProps) {
  // Split team name into words for better line breaking
  const formatTeamName = (name: string) => {
    const words = name.split(' ');
    if (words.length <= 2) {
      return name;
    }
    
    // For names with more than 2 words, split into two lines
    const midPoint = Math.ceil(words.length / 2);
    const firstLine = words.slice(0, midPoint).join(' ');
    const secondLine = words.slice(midPoint).join(' ');
    
    return (
      <>
        <span className="block">{firstLine}</span>
        <span className="block">{secondLine}</span>
      </>
    );
  };

  return (
    <div className={cn("relative h-full min-h-[300px] w-full min-w-[90px]")}>
      <div
        className="absolute inset-0 z-0 h-full w-full bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: isMyTeam
            ? "url('/pre-match/myTeamContainer.svg')"
            : "url('/pre-match/enemyTeamContainer.svg')",
        }}
      />

      <div
        className={cn(
          "relative z-10 flex h-full min-h-[250px] w-full flex-col items-center justify-center gap-8 pt-2",
          side === "left" ? "pr-5" : "pl-5",
        )}
      >
        <div className="flex h-full max-h-[60px] w-full max-w-[60px] items-center justify-center">
          <img
            src={teamImage}
            alt="team"
            className="h-full w-full object-cover"
          />
        </div>
          <h1
            className={cn(
              "font-orbitron mx-auto max-w-[140px] text-center text-lg leading-6 font-bold text-white uppercase",
              isMyTeam ? "text-overgoal-lime-green" : "text-overgoal-error",
            )}
          >
            {formatTeamName(teamName)}
          </h1>
      </div>
    </div>
  );
}
