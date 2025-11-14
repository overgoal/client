import { useSeasonPlayer } from "../dojo/hooks/useSeasonPlayer";

interface SeasonPlayerCardProps {
  className?: string;
  seasonId?: string;
}

export function SeasonPlayerCard({ className = "", seasonId }: SeasonPlayerCardProps) {
  const { seasonPlayer, isLoading, error, refetch, seasonInfo, clubInfo } = useSeasonPlayer(seasonId);

  if (isLoading) {
    return (
      <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-600 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-600 rounded w-full"></div>
            <div className="h-3 bg-gray-600 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-900/20 border border-red-500/30 rounded-lg p-6 ${className}`}>
        <h3 className="text-red-400 font-semibold mb-2">Error Loading Season Player</h3>
        <p className="text-red-300 text-sm mb-4">{error.message}</p>
        <button
          onClick={refetch}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!seasonPlayer) {
    return (
      <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
        <p className="text-gray-400">No season player data available</p>
      </div>
    );
  }

  const getRelationshipColor = (relationship: number) => {
    if (relationship >= 90) return "text-green-400";
    if (relationship >= 75) return "text-blue-400";
    if (relationship >= 60) return "text-yellow-400";
    if (relationship >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const getRelationshipLabel = (relationship: number) => {
    if (relationship >= 90) return "Excellent";
    if (relationship >= 75) return "Good";
    if (relationship >= 60) return "Average";
    if (relationship >= 40) return "Poor";
    return "Critical";
  };

  const getSeasonStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "completed":
        return "bg-blue-600";
      case "upcoming":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  const winRate = () => {
    const totalMatches = Number(seasonPlayer.matches_won) + Number(seasonPlayer.matches_lost);
    if (totalMatches === 0) return 0;
    return Math.round((Number(seasonPlayer.matches_won) / totalMatches) * 100);
  };

  const getPerformanceRating = () => {
    const points = Number(seasonPlayer.season_points);
    if (points >= 4000) return { rating: "S", color: "text-yellow-400", bg: "bg-yellow-900/30" };
    if (points >= 3000) return { rating: "A", color: "text-green-400", bg: "bg-green-900/30" };
    if (points >= 2000) return { rating: "B", color: "text-blue-400", bg: "bg-blue-900/30" };
    if (points >= 1000) return { rating: "C", color: "text-orange-400", bg: "bg-orange-900/30" };
    return { rating: "D", color: "text-red-400", bg: "bg-red-900/30" };
  };

  const performance = getPerformanceRating();

  return (
    <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-white">
              Season Performance
            </h2>
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${performance.bg} ${performance.color}`}>
              {performance.rating} Rank
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {seasonInfo && (
              <span
                className={`px-2 py-1 rounded text-xs font-medium text-white ${getSeasonStatusColor(
                  seasonInfo.status
                )}`}
              >
                {seasonInfo.name}
              </span>
            )}
            {clubInfo && (
              <span
                className="px-2 py-1 rounded text-xs font-medium text-white"
                style={{ backgroundColor: clubInfo.color }}
              >
                {clubInfo.name}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-yellow-400 font-bold text-lg">
            {Number(seasonPlayer.season_points).toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">Season Points</div>
        </div>
      </div>

      {/* Performance Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-700 rounded p-3 text-center">
          <div className="text-2xl font-bold text-green-400">
            {Number(seasonPlayer.matches_won)}
          </div>
          <div className="text-xs text-gray-400 uppercase">Wins</div>
        </div>
        <div className="bg-gray-700 rounded p-3 text-center">
          <div className="text-2xl font-bold text-red-400">
            {Number(seasonPlayer.matches_lost)}
          </div>
          <div className="text-xs text-gray-400 uppercase">Losses</div>
        </div>
        <div className="bg-gray-700 rounded p-3 text-center">
          <div className="text-2xl font-bold text-blue-400">
            {winRate()}%
          </div>
          <div className="text-xs text-gray-400 uppercase">Win Rate</div>
        </div>
        <div className="bg-gray-700 rounded p-3 text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {Number(seasonPlayer.trophies_won)}
          </div>
          <div className="text-xs text-gray-400 uppercase">Trophies</div>
        </div>
      </div>

      {/* Relationship Stats */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-3">Relationships</h3>
        
        {/* Team Relationship */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300 font-medium">Team Chemistry</span>
            <span className={`font-bold ${getRelationshipColor(Number(seasonPlayer.team_relationship))}`}>
              {getRelationshipLabel(Number(seasonPlayer.team_relationship))}
            </span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                Number(seasonPlayer.team_relationship) >= 75 ? 'bg-green-400' :
                Number(seasonPlayer.team_relationship) >= 50 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${Number(seasonPlayer.team_relationship)}%` }}
            ></div>
          </div>
          <div className="text-right text-sm text-gray-400 mt-1">
            {Number(seasonPlayer.team_relationship)}/100
          </div>
        </div>

        {/* Fan Relationship */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300 font-medium">Fan Support</span>
            <span className={`font-bold ${getRelationshipColor(Number(seasonPlayer.fans_relationship))}`}>
              {getRelationshipLabel(Number(seasonPlayer.fans_relationship))}
            </span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                Number(seasonPlayer.fans_relationship) >= 75 ? 'bg-green-400' :
                Number(seasonPlayer.fans_relationship) >= 50 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${Number(seasonPlayer.fans_relationship)}%` }}
            ></div>
          </div>
          <div className="text-right text-sm text-gray-400 mt-1">
            {Number(seasonPlayer.fans_relationship)}/100
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Player ID:</span>
            <span className="text-white font-medium">#{Number(seasonPlayer.overgoal_player_id)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Season ID:</span>
            <span className="text-white font-medium">#{Number(seasonPlayer.season_id)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
