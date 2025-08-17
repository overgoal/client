import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dumbbell, Loader2, ExternalLink } from "lucide-react";
import { useTrainAction } from "../dojo/hooks/useTrainAction";
import useAppStore from "../zustand/store";

export function GameActions() {
  const player = useAppStore((state) => state.player);

  // Separate hooks for each action
  const { trainState, executeTrain, canTrain } = useTrainAction();

  const actions = [
    {
      icon: Dumbbell,
      label: "Train",
      description: "+10 shoot",
      onClick: executeTrain,
      color: "from-blue-500 to-blue-600",
      state: trainState,
      canExecute: canTrain,
      name: "shoot",
      value: 10,
    },

  ];

  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-xl font-bold">
          Game Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!player && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
            <div className="text-yellow-400 text-sm text-center">
              🎮 Connect controller and create player to unlock actions
            </div>
          </div>
        )}

        {actions.map((action) => {
          const Icon = action.icon;
          const isLoading = action.state.isLoading;
          const hasError = Boolean(action.state.error);

          return (
            <div key={action.label} className="space-y-2">
              <Button
                onClick={() => action.onClick(action.name, action.value)}
                disabled={!action.canExecute || isLoading}
                className={`w-full h-14 bg-gradient-to-r ${action.color} hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                ) : (
                  <Icon className="w-5 h-5 mr-3" />
                )}
                <div className="flex flex-col items-start flex-1">
                  <span className="font-semibold">{action.label}</span>
                  <span className="text-xs opacity-80">
                    {action.description}
                  </span>
                </div>
                {/* {action.disabledReason && (
                  <span className="text-xs opacity-60">
                    {action.disabledReason}
                  </span>
                )} */}
              </Button>

              {/* Individual transaction state */}
              {(action.state.txStatus || hasError) && (
                <div
                  className={`p-3 rounded-lg border text-sm ${hasError
                      ? "bg-red-500/10 border-red-500/30 text-red-400"
                      : action.state.txStatus === "SUCCESS"
                        ? "bg-green-500/10 border-green-500/30 text-green-400"
                        : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                    }`}
                >
                  {hasError ? (
                    `❌ Error: ${action.state.error}`
                  ) : action.state.txStatus === "SUCCESS" ? (
                    <div className="space-y-2">
                      <div>✅ {action.label} completed successfully!</div>
                      {action.state.txHash && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-mono bg-black/20 px-2 py-1 rounded">
                            {formatAddress(action.state.txHash)}
                          </span>
                          <a
                            href={`https://sepolia.starkscan.co/tx/${action.state.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            StarkScan
                          </a>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        ⏳ {action.label} processing...
                      </div>
                      {action.state.txHash && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-mono bg-black/20 px-2 py-1 rounded">
                            {formatAddress(action.state.txHash)}
                          </span>
                          <a
                            href={`https://sepolia.starkscan.co/tx/${action.state.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Live
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
