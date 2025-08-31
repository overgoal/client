import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router";

export default function SeasonsScreen() {
  const seasons = [
    {
      id: 1,
      name: "Season 2024",
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      participants: 1250,
      description: "The current season with exciting tournaments and competitions."
    },
    {
      id: 2,
      name: "Season 2023",
      status: "completed",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      participants: 980,
      description: "Previous season with legendary matches and champions."
    },
    {
      id: 3,
      name: "Season 2022",
      status: "completed",
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      participants: 756,
      description: "The season that started it all."
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-600';
      case 'completed':
        return 'bg-blue-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-white mb-6">Seasons</h1>

          <div className="space-y-6">
            {seasons.map((season) => (
              <Card key={season.id} className="bg-slate-800/50 border-slate-700 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h2 className="text-2xl font-semibold text-white">{season.name}</h2>
                      <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(season.status)}`}>
                        {season.status.charAt(0).toUpperCase() + season.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-slate-300 mb-4">{season.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Duration:</span>
                        <span className="text-white ml-2">{season.startDate} - {season.endDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Participants:</span>
                        <span className="text-white ml-2">{season.participants.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Status:</span>
                        <span className="text-white ml-2 capitalize">{season.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 lg:mt-0 lg:ml-6">
                    <Link to={`/season/${season.id}`}>
                      <Button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700">
                        View Season
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

