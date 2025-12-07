import React, { useEffect, useRef } from "react";
import { cn } from "../../../../utils/utils";

interface MatchEvent {
  id: string;
  minute: number;
  text: string;
  type:
    | "normal"
    | "team-goal"
    | "opponent-goal"
    | "team-chance"
    | "opponent-chance";
}

interface EventFeedProps {
  events: MatchEvent[];
}

export const EventFeed: React.FC<EventFeedProps> = ({ events }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [events]);

  const getEventStyle = (type: MatchEvent["type"]) => {
    switch (type) {
      case "team-goal":
        return "bg-[#002417] text-overgoal-positive";
      case "opponent-goal":
        return "bg-[#540e40] text-overgoal-error";
      case "team-chance":
        return "bg-[#002417] text-white font-orbitron";
      case "opponent-chance":
        return "bg-[#540e40] text-white font-orbitron";
      default:
        return "bg-[#002417] text-white font-orbitron";
    }
  };

  return (
    <div className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-xl p-4">
      <div className="absolute top-0 right-0 left-0 z-10 h-8 bg-linear-to-b from-black/80 to-transparent" />

      <div className="scrollbar-none flex flex-1 flex-col gap-2 overflow-y-auto pt-4 pb-2">
        {events.length === 0 && (
          <div className="font-orbitron flex h-full items-center justify-center text-gray-500">
            Match starting...
          </div>
        )}
        {events.map((event) => (
          <div
            key={event.id}
            className={cn(
              "animate-in fade-in slide-in-from-bottom-2 flex w-full shrink-0 items-center justify-center gap-4 rounded-md px-4 py-2 text-center transition-all",
              getEventStyle(event.type),
            )}
          >
            {/* Minute Badge */}
            {/* <div className="font-orbitron flex h-8 w-12 shrink-0 items-center justify-center rounded bg-black/40 text-sm font-bold">
              {event.minute}'
            </div> */}

            {/* Event Text */}
            <span className="font-orbitron text-center text-sm font-medium tracking-wider">
              {event.text}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-8 bg-linear-to-t from-black/80 to-transparent" />
    </div>
  );
};
