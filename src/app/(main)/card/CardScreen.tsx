import { useMemo } from "react";
import CardScene from "../../../components/webgl/components/CardScene";

export default function CardScreen({ playerLinkId }: { playerLinkId: number }) {
  // Memoize static styles to prevent re-creation
  const containerStyles = useMemo(
    () => ({
      touchAction: "none" as const,
    }),
    [],
  );

  return (
    <div
      className="relative h-dvh w-full overflow-hidden"
      style={containerStyles}
    >
      {/* Background Image Layer */}
      <img
        src={"/backgrounds/bg-card.png"}
        alt="background"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        width={1000}
        height={1000}
      />

      {/* 3D Scene Layer - positioned behind UI */}
      <div className="pointer-events-auto absolute inset-0">
        <CardScene playerLinkId={playerLinkId} />
      </div>
    </div>
  );
}
