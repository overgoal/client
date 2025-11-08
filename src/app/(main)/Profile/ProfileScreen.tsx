import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Progress } from "../../../components/ui/progress";
import { Link, useParams } from "react-router";

export default function ProfileScreen() {
  const { playerId } = useParams<{ playerId: string }>();

  // Mock data - in a real app this would come from an API
  const player = {
    id: playerId,
    name: "Lionel Messi",
    position: "Forward",
    age: 36,
    nationality: "Argentina",
    club: "Inter Miami",
    height: "170 cm",
    weight: "72 kg",
    preferredFoot: "Left",
    level: 95,
    experience: 12500,
    nextLevelExp: 13500,
    skills: {
      shooting: 96,
      dribbling: 95,
      passing: 92,
      defending: 40,
      pace: 85,
      stamina: 70,
    },
  };

  const stats = {
    matches: 1024,
    goals: 789,
    assists: 334,
    cleanSheets: 0,
    trophies: 42,
    mvps: 67,
  };

  const achievements = [
    { id: 1, name: "Ballon d'Or Winner", year: 2023, unlocked: true },
    { id: 2, name: "Champions League Winner", year: 2006, unlocked: true },
    { id: 3, name: "World Cup Winner", year: 2022, unlocked: true },
    { id: 4, name: "Top Scorer", year: 2023, unlocked: true },
    {
      id: 5,
      name: "Club Legend",
      description: "Play 1000 matches",
      unlocked: false,
    },
  ];

  const recentMatches = [
    {
      id: 1,
      opponent: "LA Galaxy",
      result: "W 3-1",
      goals: 1,
      assists: 1,
      date: "2024-03-20",
    },
    {
      id: 2,
      opponent: "New York Red Bulls",
      result: "W 2-0",
      goals: 0,
      assists: 2,
      date: "2024-03-15",
    },
    {
      id: 3,
      opponent: "Orlando City",
      result: "D 1-1",
      goals: 1,
      assists: 0,
      date: "2024-03-10",
    },
  ];

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white">{player.name}</h1>
                <p className="text-slate-300 mt-2">
                  {player.position} • {player.club}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="text-right">
                  <div className="text-3xl font-bold text-yellow-400">
                    Level {player.level}
                  </div>
                  <div className="text-slate-400">
                    Experience: {player.experience}/{player.nextLevelExp}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Player Info
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Age</span>
                  <span className="text-white">{player.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Nationality</span>
                  <span className="text-white">{player.nationality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Height</span>
                  <span className="text-white">{player.height}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Weight</span>
                  <span className="text-white">{player.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Preferred Foot</span>
                  <span className="text-white">{player.preferredFoot}</span>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Career Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {stats.matches}
                  </div>
                  <div className="text-sm text-slate-400">Matches</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {stats.goals}
                  </div>
                  <div className="text-sm text-slate-400">Goals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {stats.assists}
                  </div>
                  <div className="text-sm text-slate-400">Assists</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {stats.trophies}
                  </div>
                  <div className="text-sm text-slate-400">Trophies</div>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Experience Progress
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Current</span>
                  <span className="text-white">{player.experience} XP</span>
                </div>
                <Progress
                  value={(player.experience / player.nextLevelExp) * 100}
                  className="h-3"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Next Level</span>
                  <span className="text-white">
                    {player.nextLevelExp - player.experience} XP needed
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Skills */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Skills</h2>
              <div className="space-y-4">
                {Object.entries(player.skills).map(([skill, value]) => (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-300 capitalize">{skill}</span>
                      <span className="text-white font-bold">{value}</span>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card className="bg-slate-800/50 border-slate-700 p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Achievements
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg border ${
                      achievement.unlocked
                        ? "bg-green-900/20 border-green-700"
                        : "bg-slate-700/20 border-slate-600"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          achievement.unlocked ? "bg-green-400" : "bg-slate-500"
                        }`}
                      />
                      <div className="flex-1">
                        <h3
                          className={`font-medium ${
                            achievement.unlocked
                              ? "text-white"
                              : "text-slate-400"
                          }`}
                        >
                          {achievement.name}
                        </h3>
                        {achievement.year && (
                          <p className="text-sm text-slate-400">
                            {achievement.year}
                          </p>
                        )}
                        {achievement.description && (
                          <p className="text-sm text-slate-400">
                            {achievement.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Matches */}
          <Card className="bg-slate-800/50 border-slate-700 p-6 mt-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Recent Matches
            </h2>
            <div className="space-y-3">
              {recentMatches.map((match) => (
                <div
                  key={match.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-white font-bold">{match.result}</div>
                      <div className="text-slate-400 text-sm">{match.date}</div>
                    </div>
                    <div className="text-white">vs {match.opponent}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 text-sm">
                      {match.goals} Goals
                    </div>
                    <div className="text-blue-400 text-sm">
                      {match.assists} Assists
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
