import { useState, useRef, useEffect } from "react";

const BallAngleOverlay = () => {
  const [aimPosition, setAimPosition] = useState({ x: 0.5, y: 0.5 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateAimPosition(e);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const updateAimPosition = (e: React.PointerEvent | PointerEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Calculate distance from center (0.5, 0.5)
    const centerX = 0.5;
    const centerY = 0.5;
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Max radius (0.48 matches the SVG circle r=48)
    const maxRadius = 0.48;

    if (distance > maxRadius) {
      // Clamp to circle edge
      const angle = Math.atan2(dy, dx);
      const clampedX = centerX + Math.cos(angle) * maxRadius;
      const clampedY = centerY + Math.sin(angle) * maxRadius;
      setAimPosition({ x: clampedX, y: clampedY });
    } else {
      // Inside circle
      setAimPosition({ x, y });
    }
  };

  // Add global pointer up/move listener to handle dragging outside container
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointermove", updateAimPosition as any);
      console.log("Dragging");
    } else {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointermove", updateAimPosition as any);
    }
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointermove", updateAimPosition as any);
    };
  }, [isDragging]);

  return (
    <div className="absolute inset-0 z-100 flex h-dvh w-full items-center justify-center bg-black/80">
      {/* Cybernetic Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-overgoal-blue) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-overgoal-blue) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at center, black 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 0%, transparent 80%)",
        }}
      />

      {/* Decorative Circles */}
      <div className="border-overgoal-blue absolute h-[300px] w-[300px] rounded-full border opacity-30 blur-sm" />
      <div className="border-overgoal-blue absolute h-[280px] w-[280px] rounded-full border border-dashed opacity-50" />

      {/* Interactive Ball Area Container */}
      <div
        ref={containerRef}
        className="relative h-[250px] w-[250px] cursor-crosshair touch-none"
        onPointerDown={handlePointerDown}
      >
        {/* Center Ball SVG */}
        <div className="pointer-events-none absolute inset-0 z-10 animate-pulse">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Glow effect */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="var(--color-overgoal-blue)"
              fillOpacity="0.1"
            />

            {/* Outer Ring */}
            <circle
              cx="50"
              cy="50"
              r="48"
              stroke="var(--color-overgoal-blue)"
              strokeWidth="2"
              strokeOpacity="0.8"
            />
          </svg>
        </div>

        {/* Aiming Reticle */}
        <div
          className="pointer-events-none absolute z-20 flex items-center justify-center opacity-80"
          style={{
            left: `${aimPosition.x * 100}%`,
            top: `${aimPosition.y * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Tech/Cyber Ball Pattern */}
            <path
              d="M50 2 L50 98"
              stroke="var(--color-overgoal-blue)"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <path
              d="M2 50 L98 50"
              stroke="var(--color-overgoal-blue)"
              strokeWidth="1"
              strokeOpacity="0.5"
            />

            {/* Hexagon center */}
            <path
              d="M50 20 L76 35 L76 65 L50 80 L24 65 L24 35 Z"
              stroke="var(--color-overgoal-blue)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M50 28 L69 39 L69 61 L50 72 L31 61 L31 39 Z"
              fill="var(--color-overgoal-blue)"
              fillOpacity="0.3"
            />

            {/* Corner accents */}
            <path
              d="M25 25 L35 35"
              stroke="var(--color-overgoal-blue)"
              strokeWidth="2"
            />
            <path
              d="M75 25 L65 35"
              stroke="var(--color-overgoal-blue)"
              strokeWidth="2"
            />
            <path
              d="M25 75 L35 65"
              stroke="var(--color-overgoal-blue)"
              strokeWidth="2"
            />
            <path
              d="M75 75 L65 65"
              stroke="var(--color-overgoal-blue)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Label */}
      <div className="font-orbitron text-overgoal-blue absolute mt-[350px] text-center text-sm tracking-[0.2em]">
        <div>BALL ANGLE</div>
        <div className="mt-2 text-xs opacity-70">
          X: {aimPosition.x.toFixed(2)} | Y: {aimPosition.y.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default BallAngleOverlay;
