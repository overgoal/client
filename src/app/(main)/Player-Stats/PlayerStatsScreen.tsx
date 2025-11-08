import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Link, useParams } from "react-router";

export default function PlayerStatsScreen() {
  const { playerId } = useParams<{ playerId: string }>();

  // Mock data - in a real app this would come from an API
  const playerStats = {
    id: playerId,
    name: "Lionel Messi",
    position: "Forward",
    seasonStats: {
      matchesPlayed: 28,
      goals: 22,
      assists: 14,
      shots: 89,
      shotsOnTarget: 45,
      passes: 1456,
      passAccuracy: 87,
      tackles: 12,
      interceptions: 8,
      yellowCards: 2,
      redCards: 0,
    },
    careerStats: {
      matchesPlayed: 1024,
      goals: 789,
      assists: 334,
      trophies: 42,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mt-8">
          <div className="mb-6">
            <Link to="/home">
              <Button variant="outline" className="mb-4">
                ← Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">
              {playerStats.name} - Statistics
            </h1>
            <p className="text-slate-300 mt-2">{playerStats.position}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Season Stats */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Current Season
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {playerStats.seasonStats.matchesPlayed}
                  </div>
                  <div className="text-sm text-slate-400">Matches</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {playerStats.seasonStats.goals}
                  </div>
                  <div className="text-sm text-slate-400">Goals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {playerStats.seasonStats.assists}
                  </div>
                  <div className="text-sm text-slate-400">Assists</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {playerStats.seasonStats.passAccuracy}%
                  </div>
                  <div className="text-sm text-slate-400">Pass Accuracy</div>
                </div>
              </div>
            </Card>

            {/* Detailed Stats */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Detailed Statistics
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Shots</span>
                  <span className="text-white">
                    {playerStats.seasonStats.shots}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Shots on Target</span>
                  <span className="text-white">
                    {playerStats.seasonStats.shotsOnTarget}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Passes</span>
                  <span className="text-white">
                    {playerStats.seasonStats.passes.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tackles</span>
                  <span className="text-white">
                    {playerStats.seasonStats.tackles}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Interceptions</span>
                  <span className="text-white">
                    {playerStats.seasonStats.interceptions}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Yellow Cards</span>
                  <span className="text-yellow-400">
                    {playerStats.seasonStats.yellowCards}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Red Cards</span>
                  <span className="text-red-400">
                    {playerStats.seasonStats.redCards}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Career Stats */}
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Career Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {playerStats.careerStats.matchesPlayed}
                </div>
                <div className="text-sm text-slate-400">Career Matches</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">
                  {playerStats.careerStats.goals}
                </div>
                <div className="text-sm text-slate-400">Career Goals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">
                  {playerStats.careerStats.assists}
                </div>
                <div className="text-sm text-slate-400">Career Assists</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {playerStats.careerStats.trophies}
                </div>
                <div className="text-sm text-slate-400">Trophies Won</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
