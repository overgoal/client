import { useState } from "react";
import { SeasonPlayerCard } from "../components/SeasonPlayerCard";
import { useSeasonPlayer } from "../dojo/hooks/useSeasonPlayer";

/**
 * Example component showing how to use the useSeasonPlayer hook
 * and SeasonPlayerCard component
 */
export function SeasonPlayerExample() {
  const [selectedSeason, setSelectedSeason] = useState<string>("2024");
  const { seasonPlayer, isLoading, isFetched, error, refetch, seasonInfo, clubInfo } = 
    useSeasonPlayer(selectedSeason);

  const availableSeasons = [
    { id: "2024", name: "Premier League 2024", status: "active" },
    { id: "2023", name: "Premier League 2023", status: "completed" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Season Player Demo
        </h1>

        {/* Season Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Select Season</h2>
          <div className="flex gap-4 flex-wrap">
            {availableSeasons.map((season) => (
              <button
                key={season.id}
                onClick={() => setSelectedSeason(season.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedSeason === season.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {season.name}
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  season.status === "active" ? "bg-green-600" : "bg-gray-600"
                }`}>
                  {season.status}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Season Player Card */}
        <div className="mb-8">
          <SeasonPlayerCard seasonId={selectedSeason} className="max-w-2xl" />
        </div>

        {/* Debug Information */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Hook State</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Loading:</span>
              <span className={isLoading ? "text-yellow-400" : "text-green-400"}>
                {isLoading ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Fetched:</span>
              <span className={isFetched ? "text-green-400" : "text-gray-400"}>
                {isFetched ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Has Error:</span>
              <span className={error ? "text-red-400" : "text-green-400"}>
                {error ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Has Season Player:</span>
              <span className={seasonPlayer ? "text-green-400" : "text-gray-400"}>
                {seasonPlayer ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Season Info:</span>
              <span className={seasonInfo ? "text-green-400" : "text-gray-400"}>
                {seasonInfo ? seasonInfo.name : "None"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Club Info:</span>
              <span className={clubInfo ? "text-green-400" : "text-gray-400"}>
                {clubInfo ? clubInfo.name : "None"}
              </span>
            </div>
          </div>

          {/* Season Performance Summary */}
          {seasonPlayer && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-white mb-3">Performance Summary</h3>
              <div className="bg-gray-900 p-4 rounded">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Season Points</div>
                    <div className="text-yellow-400 font-bold">
                      {Number(seasonPlayer.season_points).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Win Rate</div>
                    <div className="text-green-400 font-bold">
                      {Math.round((Number(seasonPlayer.matches_won) / 
                        (Number(seasonPlayer.matches_won) + Number(seasonPlayer.matches_lost))) * 100) || 0}%
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Team Chemistry</div>
                    <div className="text-blue-400 font-bold">
                      {Number(seasonPlayer.team_relationship)}/100
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400">Fan Support</div>
                    <div className="text-purple-400 font-bold">
                      {Number(seasonPlayer.fans_relationship)}/100
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Raw Data Display */}
          {seasonPlayer && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-white mb-2">Raw Season Player Data</h3>
              <pre className="bg-gray-900 p-4 rounded text-xs text-gray-300 overflow-auto">
                {JSON.stringify({
                  seasonPlayer,
                  seasonInfo,
                  clubInfo
                }, null, 2)}
              </pre>
            </div>
          )}

          {/* Manual Refetch Button */}
          <div className="mt-6">
            <button
              onClick={refetch}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
            >
              {isLoading ? "Refetching..." : "Refetch Season Player"}
            </button>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Usage Instructions</h2>
          <div className="text-blue-200 space-y-2 text-sm">
            <p>
              <strong>1. Hook Usage:</strong> Import and use <code className="bg-blue-800 px-1 rounded">useSeasonPlayer(seasonId?)</code> in any component.
            </p>
            <p>
              <strong>2. Season Selection:</strong> Pass an optional <code className="bg-blue-800 px-1 rounded">seasonId</code> to get data for a specific season.
            </p>
            <p>
              <strong>3. Mock Data:</strong> The hook uses mock data from <code className="bg-blue-800 px-1 rounded">mock-season-players.json</code>.
            </p>
            <p>
              <strong>4. Address Mapping:</strong> Different wallet addresses will show different season performances.
            </p>
            <p>
              <strong>5. Component:</strong> Use <code className="bg-blue-800 px-1 rounded">SeasonPlayerCard</code> for a ready-made season performance display.
            </p>
            <p>
              <strong>6. Additional Data:</strong> The hook also returns <code className="bg-blue-800 px-1 rounded">seasonInfo</code> and <code className="bg-blue-800 px-1 rounded">clubInfo</code> for context.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
