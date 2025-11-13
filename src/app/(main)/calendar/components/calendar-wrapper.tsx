import CalendarTeamItemComponent from "./calendar-team-item";

type Props = {
  teams: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
};

export default function CalendarWrapper({ teams }: Props) {
  return (
    <div className="grid grid-cols-5 gap-x-10">
      {teams.map((team) => (
        <CalendarTeamItemComponent key={team.id}>
          <span className="font-orbitron text-overgoal-blue text-center text-base font-normal">
            {team.name}
          </span>
          <img
            src={team.imageUrl}
            alt={team.name}
            className="h-12 w-12 object-contain object-center"
          />
        </CalendarTeamItemComponent>
      ))}
    </div>
  );
}
