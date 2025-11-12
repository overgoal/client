import { useRef, useEffect, useState } from "react";
import { cn } from "../../utils/utils";

interface StaminaBarProps {
  value: number; // 0–100
  className?: string;
}

export function StaminaBar({ value, className }: StaminaBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState(0);

  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));

  // Update parent width when mounted or resized
  useEffect(() => {
    if (!barRef.current) return;

    const updateWidth = () => {
      setParentWidth(barRef.current!.offsetWidth);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Determine number of segments
  const allSegments = [
    { type: "start", index: 0 },
    ...Array.from({ length: 8 }, (_, i) => ({ type: "mid", index: i + 1 })),
    { type: "end", index: 9 },
  ];

  // Calculate filled width in pixels
  const filledWidth = (parentWidth * clampedValue) / 100;

  return (
    <div
      ref={barRef}
      className={cn("relative flex h-full w-full items-center", className)}
    >
      {/* Filled bar */}
      <div
        className="absolute left-0 top-0 flex h-full items-center overflow-hidden transition-all duration-300 ease-out"
        style={{ width: filledWidth }}
      >
        {allSegments.map((segment) => (
          <img
            key={`filled-${segment.type}-${segment.index}`}
            src={
              segment.type === "start"
                ? "/stamina/bar-start.svg"
                : segment.type === "mid"
                ? "/stamina/bar-mid.svg"
                : "/stamina/bar-start.svg"
            }
            alt={`stamina ${segment.type}`}
            className={cn(
              "h-full w-auto shrink-0",
              segment.type === "end" && "scale-x-[-1]"
            )}
          />
        ))}
      </div>
    </div>
  );
}
