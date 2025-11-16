import { OvergoalPlayerCard } from "../components/OvergoalPlayerCard";
import { useOvergoalPlayer } from "../dojo/hooks/useOvergoalPlayer";

/**
 * Example component showing how to use the useOvergoalPlayer hook
 * and OvergoalPlayerCard component
 */
export function OvergoalPlayerExample() {
  const { overgoalPlayer, isLoading, isFetched, error, refetch } = useOvergoalPlayer();

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Overgoal Player Demo
        </h1>

        {/* Player Card */}
        <div className="mb-8">
          <OvergoalPlayerCard className="max-w-2xl" />
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
              <span className="text-gray-400">Has Player:</span>
              <span className={overgoalPlayer ? "text-green-400" : "text-gray-400"}>
                {overgoalPlayer ? "Yes" : "No"}
              </span>
            </div>
          </div>

          {/* Raw Data Display */}
          {overgoalPlayer && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-white mb-2">Raw Player Data</h3>
              <pre className="bg-gray-900 p-4 rounded text-xs text-gray-300 overflow-auto">
                {JSON.stringify(overgoalPlayer, null, 2)}
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
              {isLoading ? "Refetching..." : "Refetch Player"}
            </button>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Usage Instructions</h2>
          <div className="text-blue-200 space-y-2 text-sm">
            <p>
              <strong>1. Hook Usage:</strong> Import and use <code className="bg-blue-800 px-1 rounded">useOvergoalPlayer()</code> in any component.
            </p>
            <p>
              <strong>2. Mock Data:</strong> The hook uses mock data from <code className="bg-blue-800 px-1 rounded">mock-overgoal-players.json</code>.
            </p>
            <p>
              <strong>3. Address Mapping:</strong> Different wallet addresses will show different players from the mock data.
            </p>
            <p>
              <strong>4. Component:</strong> Use <code className="bg-blue-800 px-1 rounded">OvergoalPlayerCard</code> for a ready-made player display.
            </p>
            <p>
              <strong>5. State Management:</strong> Player data is automatically stored in Zustand and persisted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
