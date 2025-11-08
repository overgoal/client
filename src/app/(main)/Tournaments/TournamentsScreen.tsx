import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router";

export default function TournamentsScreen() {
  const tournaments = [
    {
      id: 1,
      name: "Champions League",
      status: "ongoing",
      type: "International",
      prizePool: 1000000,
      participants: 32,
      currentRound: "Round of 16",
      startDate: "2024-02-01",
      endDate: "2024-05-30",
      description:
        "The most prestigious club competition in European football.",
    },
    {
      id: 2,
      name: "Europa League",
      status: "ongoing",
      type: "International",
      prizePool: 500000,
      participants: 24,
      currentRound: "Group Stage",
      startDate: "2024-02-15",
      endDate: "2024-05-22",
      description: "Second-tier European club competition.",
    },
    {
      id: 3,
      name: "FA Cup",
      status: "upcoming",
      type: "Domestic",
      prizePool: 200000,
      participants: 64,
      currentRound: "Not Started",
      startDate: "2024-04-01",
      endDate: "2024-05-25",
      description: "England's primary national cup knockout competition.",
    },
    {
      id: 4,
      name: "Copa America",
      status: "completed",
      type: "International",
      prizePool: 300000,
      participants: 16,
      currentRound: "Final",
      startDate: "2024-01-10",
      endDate: "2024-02-14",
      description: "South America's premier international tournament.",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-green-600";
      case "upcoming":
        return "bg-yellow-600";
      case "completed":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "International":
        return "bg-purple-600";
      case "Domestic":
        return "bg-indigo-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-white mb-6">Tournaments</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tournaments.map((tournament) => (
              <Card
                key={tournament.id}
                className="bg-slate-800/50 border-slate-700 p-6"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-white mb-2">
                        {tournament.name}
                      </h2>
                      <div className="flex items-center space-x-2 mb-3">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getTypeColor(tournament.type)}`}
                        >
                          {tournament.type}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(tournament.status)}`}
                        >
                          {tournament.status.charAt(0).toUpperCase() +
                            tournament.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-4 flex-grow">
                    {tournament.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-slate-400 text-sm">Prize Pool</span>
                      <div className="text-yellow-400 font-bold">
                        ${tournament.prizePool.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-sm">
                        Participants
                      </span>
                      <div className="text-white font-bold">
                        {tournament.participants}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Current Round</span>
                      <span className="text-white">
                        {tournament.currentRound}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Duration</span>
                      <span className="text-white">
                        {tournament.startDate} - {tournament.endDate}
                      </span>
                    </div>
                  </div>

                  <Link to={`/tournament/${tournament.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      View Tournament
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
