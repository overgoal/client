import SeasonTeamItem from "./team-item";
import teamsData from "./teams.json";

export type SeasonTeam = {
  id: string;
  name: string;
  points: number;
  members: number;
  imageUrl: string;
};
type SeasonTeamsListProps = {
  teams?: SeasonTeam[];
};

export default function TeamsList({ teams = teamsData }: SeasonTeamsListProps) {
  return (
    <div className="flex flex-col gap-4 w-full items-center justify-center">
      {teams.map((team, index) => (
        <SeasonTeamItem key={team.id} {...team} index={index + 1} />
      ))}
    </div>
  );
}
