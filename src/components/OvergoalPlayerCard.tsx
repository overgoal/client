import { useOvergoalPlayer } from "../dojo/hooks/useOvergoalPlayer";

interface OvergoalPlayerCardProps {
  className?: string;
}

export function OvergoalPlayerCard({ className = "" }: OvergoalPlayerCardProps) {
  const { overgoalPlayer, isLoading, error, refetch } = useOvergoalPlayer();

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
        <h3 className="text-red-400 font-semibold mb-2">Error Loading Player</h3>
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

  if (!overgoalPlayer) {
    return (
      <div className={`bg-gray-800 rounded-lg p-6 ${className}`}>
        <p className="text-gray-400">No player data available</p>
      </div>
    );
  }

  const getEnergyColor = (energy: number) => {
    if (energy >= 80) return "text-green-400";
    if (energy >= 60) return "text-yellow-400";
    if (energy >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "forward":
        return "bg-red-600";
      case "midfielder":
        return "bg-blue-600";
      case "defender":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">
            {overgoalPlayer.player_name}
          </h2>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded text-xs font-medium text-white ${getCategoryColor(
                overgoalPlayer.player_category
              )}`}
            >
              {overgoalPlayer.player_category.toUpperCase()}
            </span>
            {overgoalPlayer.is_injured && (
              <span className="px-2 py-1 rounded text-xs font-medium bg-red-600 text-white">
                INJURED
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-yellow-400 font-semibold">
            {Number(overgoalPlayer.goal_currency)} GOAL
          </div>
          <div className={`text-sm ${getEnergyColor(Number(overgoalPlayer.energy))}`}>
            Energy: {Number(overgoalPlayer.energy)}%
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
        {overgoalPlayer.player_description}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-700 rounded p-3 text-center">
          <div className="text-2xl font-bold text-white">
            {Number(overgoalPlayer.speed)}
          </div>
          <div className="text-xs text-gray-400 uppercase">Speed</div>
        </div>
        <div className="bg-gray-700 rounded p-3 text-center">
          <div className="text-2xl font-bold text-white">
            {Number(overgoalPlayer.shoot)}
          </div>
          <div className="text-xs text-gray-400 uppercase">Shooting</div>
        </div>
        <div className="bg-gray-700 rounded p-3 text-center">
          <div className="text-2xl font-bold text-white">
            {Number(overgoalPlayer.pass)}
          </div>
          <div className="text-xs text-gray-400 uppercase">Passing</div>
        </div>
        <div className="bg-gray-700 rounded p-3 text-center">
          <div className="text-2xl font-bold text-white">
            {Number(overgoalPlayer.leadership)}
          </div>
          <div className="text-xs text-gray-400 uppercase">Leadership</div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Free Kick:</span>
          <span className="text-white font-medium">{Number(overgoalPlayer.freekick)}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-400">Visor:</span>
          <span className="text-white font-medium">
            Type {Number(overgoalPlayer.visor_type)} - Color {Number(overgoalPlayer.visor_color)}
          </span>
        </div>
      </div>
    </div>
  );
}
