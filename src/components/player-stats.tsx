import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { useAccount } from "@starknet-react/core";
import useAppStore from "../zustand/store";
import { Coins, Zap, Heart, Loader2 } from "lucide-react";

export function PlayerStats() {
  const { status } = useAccount();
  const player = useAppStore((state) => state.player);
  const isLoading = useAppStore((state) => state.isLoading);

  const isConnected = status === "connected";

  // Use real player data or default values
  const stats = [
    {
      label: "Fame",
      value: player?.fame || 0,
      color: "text-blue-400",
      icon: Zap,
    },
  ];

  // Calculate experience for level up (example: every 100 exp = 1 level)
  const currentFameLevel = Math.floor((player?.fame || 0) / 100) + 1;
  const fameInCurrentLevel = (player?.fame || 0) % 100;
  const fameNeededForNextLevel = 100;

  if (isLoading) {
    return (
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-xl font-bold">
            Player Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3 text-slate-300">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading player data...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">
          Player Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main stats */}
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">{stat.label}</span>
              </div>
            </div>
          );
        })}

        {/* Experience bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Level {currentFameLevel}</span>
            <span className="text-blue-400 font-bold">
              {fameInCurrentLevel} / {fameNeededForNextLevel}
            </span>
          </div>
          <Progress
            value={(fameInCurrentLevel / fameNeededForNextLevel) * 100}
            className="h-2 bg-slate-700"
          />
        </div>

        {/* Connection states */}
        {!isConnected && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-yellow-400 text-sm">
              <Coins className="w-4 h-4" />
              <span>Connect controller to load real player stats</span>
            </div>
          </div>
        )}

        {isConnected && !player && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-blue-400 text-sm">
              <Zap className="w-4 h-4" />
              <span>Creating your player automatically...</span>
            </div>
          </div>
        )}

        {isConnected && player && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <Heart className="w-4 h-4" />
              <span>Player ready! Use actions to train and progress.</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
