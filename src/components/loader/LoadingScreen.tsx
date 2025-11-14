import { Loader2 } from "lucide-react";

import background from "/backgrounds/glitch-bg.webp";
import { GlitchText } from "../ui/glitch-text";

interface LoadingScreenProps {
  isLoading?: boolean;
  progress?: number;
}

export default function LoadingScreen({ isLoading = true, progress = 0 }: LoadingScreenProps) {
  if (!isLoading) return null;

  return (
    <div className="bg-overgoal-dark-blue absolute z-100! flex h-lvh w-screen flex-col items-center justify-center gap-4 transition-opacity duration-500">
      <img
        loading="lazy"
        src={background}
        alt="background"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        width={1000}
        height={1000}
      />
      <Loader2 className="z-100 h-16 w-16 animate-spin text-white" />
      <GlitchText className="text-4xl text-white" text="Loading..." />
      {progress > 0 && (
        <div className="z-100 mt-4 w-64">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-center text-sm text-white/80">{Math.round(progress)}%</p>
        </div>
      )}
    </div>
  );
}
