import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Link, useParams } from "react-router";

export default function SeasonClubScreen() {
  const { seasonId, clubId } = useParams<{ seasonId: string; clubId: string }>();

  // Mock data - in a real app this would come from an API
  const club = {
    id: clubId,
    name: "FC Barcelona",
    league: "La Liga",
    founded: 1899,
    stadium: "Camp Nou",
    capacity: 99354,
    manager: "Xavi Hernandez",
    points: 28,
    position: 1,
    played: 12,
    wins: 9,
    draws: 1,
    losses: 2,
    goalsFor: 32,
    goalsAgainst: 15,
    goalDifference: 17,
  };

  const players = [
    { id: 1, name: "Lionel Messi", position: "Forward", goals: 12, assists: 8 },
    { id: 2, name: "Pedri", position: "Midfielder", goals: 3, assists: 6 },
    { id: 3, name: "Gavi", position: "Midfielder", goals: 2, assists: 4 },
    { id: 4, name: "Ronald Araujo", position: "Defender", goals: 1, assists: 1 },
    { id: 5, name: "Marc-Andre ter Stegen", position: "Goalkeeper", goals: 0, assists: 0 },
  ];

  const recentMatches = [
    { id: 1, opponent: "Real Madrid", result: "W 2-1", date: "2024-03-20", home: true },
    { id: 2, opponent: "Atletico Madrid", result: "W 3-0", date: "2024-03-15", home: false },
    { id: 3, opponent: "Sevilla FC", result: "D 1-1", date: "2024-03-10", home: true },
    { id: 4, opponent: "Valencia CF", result: "W 4-2", date: "2024-03-05", home: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mt-8">
          <div className="mb-6">
            <Link to={`/season/${seasonId}`}>
              <Button variant="outline" className="mb-4">
                ← Back to Season
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">{club.name}</h1>
            <p className="text-slate-300 mt-2">{club.league} • Founded {club.founded}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Club Info</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Stadium</span>
                  <span className="text-white">{club.stadium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Capacity</span>
                  <span className="text-white">{club.capacity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Manager</span>
                  <span className="text-white">{club.manager}</span>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">League Standings</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Position</span>
                  <span className="text-white font-bold">{club.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Points</span>
                  <span className="text-white">{club.points}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Played</span>
                  <span className="text-white">{club.played}</span>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Season Stats</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">{club.wins}</div>
                  <div className="text-sm text-slate-400">Wins</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">{club.draws}</div>
                  <div className="text-sm text-slate-400">Draws</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-400">{club.losses}</div>
                  <div className="text-sm text-slate-400">Losses</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-600">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Goals</span>
                  <span className="text-white">{club.goalsFor}-{club.goalsAgainst} ({club.goalDifference > 0 ? '+' : ''}{club.goalDifference})</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Squad */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Squad</h2>
              <div className="space-y-3">
                {players.map((player) => (
                  <Link key={player.id} to={`/profile/${player.id}`}>
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer">
                      <div>
                        <div className="text-white font-medium">{player.name}</div>
                        <div className="text-slate-400 text-sm">{player.position}</div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="text-white">{player.goals}G {player.assists}A</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Recent Matches */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Recent Matches</h2>
              <div className="space-y-3">
                {recentMatches.map((match) => (
                  <div key={match.id} className="p-3 rounded-lg bg-slate-700/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300 text-sm">{match.date}</span>
                      <span className="text-white font-bold">{match.result}</span>
                    </div>
                    <div className="text-white text-sm">
                      {match.home ? 'vs' : '@'} {match.opponent}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

