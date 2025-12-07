import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { LiveHeader } from "./components/LiveHeader";
import { EventFeed } from "./components/EventFeed";
import { MatchControls } from "./components/MatchControls";
import { BackButton } from "../../../components/ui/back-button";

// --- Types ---
type MatchEvent = {
  id: string;
  minute: number;
  text: string;
  type:
    | "normal"
    | "team-goal"
    | "opponent-goal"
    | "team-chance"
    | "opponent-chance";
};

type EffortLevel = "low" | "medium" | "high";
type Playstyle = "defense" | "balanced" | "offensive";

// --- Mock Data Generators ---
const EVENTS_POOL = [
  "Dojo United moving the ball nicely...",
  "Cartridge City with a strong tackle!",
  "Long ball forward...",
  "Great interception by the defender.",
  "The crowd is going wild!",
  "Steady possession in the midfield.",
  "Looking for an opening...",
];

const CHANCE_EVENTS = [
  "Dojo United have a great chance!",
  "Cartridge City breaking through the defense!",
  "He shoots...!",
  "One on one with the keeper!",
];

const GOAL_EVENTS = [
  "GOAL! What a finish!",
  "It's in the back of the net! GOAL!",
  "Unstoppable strike! GOAL!",
];

export default function MatchScreen() {
  const { matchId } = useParams(); // matchId is present in URL but unused in client logic currently

  // Game State
  const [time, setTime] = useState(0);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [events, setEvents] = useState<MatchEvent[]>([]);

  // User Controls State
  const [effort, setEffort] = useState<EffortLevel>("medium");
  const [playstyle, setPlaystyle] = useState<Playstyle>("balanced");

  // Simulation Loop
  useEffect(() => {
    if (time >= 90) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 1;
      });

      // Simulation Logic (Simulate random events)
      const random = Math.random();

      let newEvent: MatchEvent | null = null;
      const eventBase = {
        id: Math.random().toString(36).substr(2, 9),
        minute: time + 1,
      };

      if (random < 0.3) {
        // Normal Event
        newEvent = {
          ...eventBase,
          text: EVENTS_POOL[Math.floor(Math.random() * EVENTS_POOL.length)],
          type: "normal",
        };
      } else if (random > 0.9 && random < 0.95) {
        // Chance
        const whoChance = Math.random() > 0.5 ? "home" : "away";
        newEvent = {
          ...eventBase,
          text: CHANCE_EVENTS[Math.floor(Math.random() * CHANCE_EVENTS.length)],
          type: whoChance === "home" ? "team-chance" : "opponent-chance",
        };
      } else if (random >= 0.97) {
        // Goal
        // Determine who scored based on rudimentary "momentum" (random for now)
        const whoScored = Math.random() > 0.5 ? "home" : "away";
        if (whoScored === "home") setHomeScore((s) => s + 1);
        else setAwayScore((s) => s + 1);

        newEvent = {
          ...eventBase,
          text: GOAL_EVENTS[Math.floor(Math.random() * GOAL_EVENTS.length)],
          type: whoScored === "home" ? "team-goal" : "opponent-goal",
        };
      }

      if (newEvent) {
        setEvents((prev) => [...prev, newEvent!]);
      }
    }, 1000); // 1 second = 1 minute

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="flex h-dvh w-full flex-col items-center overflow-hidden bg-[url('/backgrounds/glitch-bg.webp')] bg-center bg-no-repeat p-4 text-white">
      {/* Background Overlay */}

      <div className="z-10 flex h-full w-full max-w-4xl flex-col items-center justify-between gap-4 pb-4">
        {/* Header */}
        <div className="flex min-h-0 w-full shrink flex-col items-center justify-center rounded-2xl">
          <LiveHeader
            homeTeamName="Dojo United"
            awayTeamName="Cartridge City"
            homeScore={homeScore}
            awayScore={awayScore}
            time={time}
          />
          <EventFeed events={events} />
        </div>

        {/* Event Feed - Takes available space */}

        {/* Controls - Pinned to bottom naturally via flex */}
        <div className="w-full shrink-0">
          <MatchControls
            effort={effort}
            setEffort={setEffort}
            playstyle={playstyle}
            setPlaystyle={setPlaystyle}
          />
        </div>
      </div>
    </div>
  );
}
