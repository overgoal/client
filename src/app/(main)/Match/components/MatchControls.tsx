import React from "react";
import { cn } from "../../../../utils/utils";

// Define Types
type EffortLevel = "low" | "medium" | "high";
type Playstyle = "defense" | "balanced" | "offensive";

interface MatchControlsProps {
  effort: EffortLevel;
  setEffort: (effort: EffortLevel) => void;
  playstyle: Playstyle;
  setPlaystyle: (style: Playstyle) => void;
}

export const MatchControls: React.FC<MatchControlsProps> = ({
  effort,
  setEffort,
  playstyle,
  setPlaystyle,
}) => {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      {/* EFFORT SECTION */}
      <div className="flex flex-col gap-3">
        <div className="rounded-t-lg border border-cyan-500/30 bg-cyan-950/30 px-4 py-1">
          <span className="font-orbitron text-sm font-bold tracking-widest text-cyan-400 uppercase">
            Effort
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {/* Low - Red */}
          <button
            onClick={() => setEffort("low")}
            className={cn(
              "group relative flex h-24 flex-col items-center justify-center gap-3 rounded-md border py-4 transition-all hover:scale-105",
              effort === "low"
                ? "border-overgoal-blue"
                : "hover:border-overgoal-blue border-gray-800 opacity-60 hover:opacity-100",
            )}
          >
            <span
              className={cn(
                "font-orbitron text-sm font-bold uppercase",
                effort === "low"
                  ? "text-overgoal-blue"
                  : "text-overgoal-blue/60",
              )}
            >
              Low
            </span>
            <img src="/icons/Low.webp" alt="" className="h-10 w-10" />
          </button>

          <button
            onClick={() => setEffort("medium")}
            className={cn(
              "group relative flex h-24 flex-col items-center justify-center gap-3 rounded-md border py-4 transition-all hover:scale-105",
              effort === "medium"
                ? "border-overgoal-blue"
                : "hover:border-overgoal-blue border-gray-800 opacity-60 hover:opacity-100",
            )}
          >
            <span
              className={cn(
                "font-orbitron text-sm font-bold uppercase",
                effort === "medium"
                  ? "text-overgoal-blue"
                  : "text-overgoal-blue/60",
              )}
            >
              Medium
            </span>
            <img src="/icons/Medium.webp" alt="" className="h-10 w-10" />
          </button>

          <button
            onClick={() => setEffort("high")}
            className={cn(
              "group relative flex h-24 flex-col items-center justify-center gap-3 rounded-md border py-4 transition-all hover:scale-105",
              effort === "high"
                ? "border-overgoal-blue"
                : "hover:border-overgoal-blue border-gray-800 opacity-60 hover:opacity-100",
            )}
          >
            <span
              className={cn(
                "font-orbitron text-sm font-bold uppercase",
                effort === "high"
                  ? "text-overgoal-blue"
                  : "text-overgoal-blue/60",
              )}
            >
              High
            </span>
            <img src="/icons/High.png" alt="" className="h-10 w-10" />
          </button>
        </div>
      </div>

      {/* PLAYSTYLE SECTION */}
      <div className="flex flex-col gap-3">
        <div className="rounded-t-lg border border-cyan-500/30 bg-cyan-950/30 px-4 py-1">
          <span className="font-orbitron text-sm font-bold tracking-widest text-cyan-400 uppercase">
            Playstyle
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {/* Defense */}
          <button
            onClick={() => setPlaystyle("defense")}
            className={cn(
              "group border-overgoal-blue relative flex h-20 flex-col items-center justify-center gap-2 rounded-md border py-1 transition-all hover:scale-105",
              playstyle === "defense"
                ? "border-overgoal-blue"
                : "hover:border-overgoal-blue border-gray-800 opacity-60 hover:opacity-100",
            )}
          >
            <span
              className={cn(
                "font-orbitron text-sm",
                playstyle === "defense"
                  ? "text-overgoal-blue"
                  : "text-overgoal-blue/60",
              )}
            >
              Defense
            </span>

            <img src="/icons/Defense.webp" alt="" className="h-10 w-10" />
          </button>

          {/* Balanced */}
          <button
            onClick={() => setPlaystyle("balanced")}
            className={cn(
              "group border-overgoal-blue relative flex h-20 flex-col items-center justify-center gap-2 rounded-md border py-1 transition-all hover:scale-105",
              playstyle === "balanced"
                ? "border-overgoal-blue"
                : "hover:border-overgoal-blue border-gray-800 opacity-60 hover:opacity-100",
            )}
          >
            <span
              className={cn(
                "font-orbitron text-sm",
                playstyle === "balanced"
                  ? "text-overgoal-blue"
                  : "text-overgoal-blue/60",
              )}
            >
              Balanced
            </span>

            <img src="/icons/Balanced.webp" alt="" className="h-10 w-10" />
          </button>

          {/* Offensive */}
          <button
            onClick={() => setPlaystyle("offensive")}
            className={cn(
              "group border-overgoal-blue relative flex h-20 flex-col items-center justify-center gap-2 rounded-md border py-1 transition-all hover:scale-105",
              playstyle === "offensive"
                ? "border-overgoal-blue"
                : "hover:border-overgoal-blue border-gray-800 opacity-60 hover:opacity-100",
            )}
          >
            <span
              className={cn(
                "font-orbitron text-sm",
                playstyle === "offensive"
                  ? "text-overgoal-blue"
                  : "text-overgoal-blue/60",
              )}
            >
              Offensive
            </span>

            <img src="/icons/Offense.png" alt="" className="h-10 w-10" />
          </button>
        </div>
      </div>
    </div>
  );
};
