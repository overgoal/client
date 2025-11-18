import CalendarComponent from "./calendar-team-item";
import teamsData from "../../Seasons/components/teams.json";

interface Team {
  id: number;
  name: string;
  imageUrl: string;
}

interface CalendarEvent {
  id: string;
  date: string;
  teamLogo: string;
  teamName: string;
  homeScore?: number;
  awayScore?: number;
}

interface CalendarListProps {
  events?: CalendarEvent[];
}

// Generate calendar events from teams.json data
const generateEventsFromTeams = (): CalendarEvent[] => {
  const teams: Team[] = teamsData;
  const startDate = new Date(2024, 9, 6); // October 6, 2024

  return teams.map((team, index) => {
    const eventDate = new Date(startDate);
    eventDate.setDate(startDate.getDate() + index);

    // Generate random scores for some matches (about 60% of them)
    const hasScore = Math.random() > 0.4;
    const homeScore = hasScore ? Math.floor(Math.random() * 5) : undefined;
    const awayScore = hasScore ? Math.floor(Math.random() * 5) : undefined;

    return {
      id: team.id.toString(),
      date: `${eventDate.getDate()}/${eventDate.getMonth() + 1}`,
      teamLogo: team.imageUrl,
      teamName: team.name,
      homeScore,
      awayScore,
    };
  });
};

const eventsFromTeams = generateEventsFromTeams();

// Component to render straight line connectors
function StraightConnector({
  position,
}: {
  position: "horizontal" | "vertical";
}) {
  return (
    <div
      className={`bg-overgoal-blue absolute -z-10 ${
        position === "horizontal"
          ? "top-1/2 left-13 h-0.5 w-10 transform"
          : "top-full left-1/2 h-12 w-0.5 -translate-x-1/2 transform"
      }`}
    />
  );
}

// const SVGComponent = (props: React.SVGProps<SVGSVGElement>) => (
//   <svg
//     width="100%"
//     height={23}
//     viewBox="0 0 123 23"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     className="col-span-5 w-full"
//     {...props}
//   >
//     <line x1={0.5} y1={11.5} x2={122.5} y2={11.5} stroke="white" />
//     <path d="M0.5 23L0.5 11" stroke="white" />
//     <line x1={122} y1={12} x2={122} stroke="white" />
//   </svg>
// );

export default function CalendarList({
  events = eventsFromTeams,
}: CalendarListProps) {
  const renderConnector = (index: number, totalEvents: number) => {
    // Don't render connector for the last element
    if (index === totalEvents - 1) return null;

    const position = index % 3; // 0, 1, or 2 (column position)

    // Only render horizontal connectors within the same row
    if (position !== 2) {
      return (
        <StraightConnector key={`connector-${index}`} position="horizontal" />
      );
    }

    return null;
  };


  return (
    <div className="h-full max-h-screen w-full overflow-x-hidden overflow-y-auto px-16 py-8">
      <div className="grid grid-cols-3 gap-x-24 gap-y-12 ">
        {events.map((event, index) => (
          <>
            <div key={event.id} className="relative z-30! flex justify-center">
              <CalendarComponent>
                <span className="font-orbitron text-overgoal-blue text-center text-base font-normal z-30!">
                  {event.date}
                </span>
                <img
                  src={event.teamLogo}
                  alt={event.teamName}
                  className="h-12 w-12 object-contain object-center"
                />
              </CalendarComponent>
              {renderConnector(index, events.length)}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
