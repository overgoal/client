import React from "react";
import { PlayerData } from "./ChangeableModels";
import { cn } from "../../utils/utils";
import { mapCardBorderTexture } from "../../utils/mapTeamTexture";
import { Html } from "@react-three/drei";

const getPlayerTeam = (team: number | undefined) => {
  if (team === 0) return "/teams/Cartridge City.png";
  if (team === 1) return "/teams/dojoUnited.png";
  if (team === 2) return "/teams/Nova United.png";
  return "/teams/Drakon core.png";
};

const getCategoryImage = (category: string): string => {
  return `/card/logo_${category}.webp`;
};

type Props = {
  player: PlayerData;
};

export default function CardViewer({ player }: Props) {
  const categoryImages = mapCardBorderTexture(
    player?.player_category ?? "bronze",
  );

  return (
    <Html
      position={[0, 0, 0]}
      fullscreen
      className="pointer-events-none h-dvh py-2"
    >
      <div className="flex h-full w-full flex-col items-center justify-between">
        <div className="flex w-full flex-row items-center justify-start gap-2 px-2 sm:gap-4 sm:px-4 sm:pt-4">
          <img
            src="/card/Asset-08.png"
            alt=""
            className="absolute top-0 left-0 h-full w-full object-cover"
          />
          <div className="absolute -top-2 -left-2 z-100 h-36 w-36 rounded-full bg-black bg-[url('/card/Asset-02.png')] bg-cover bg-center sm:-top-4 sm:-left-4 sm:h-32 sm:w-32 md:h-42 md:w-42">
            <img
              src={getPlayerTeam(player?.team_id)}
              alt=""
              className={cn(
                "relative z-100 scale-40 object-contain object-center",
                player?.team_id === 1
                  ? "top-1/2 left-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2"
                  : "",
                player?.team_id === 3
                  ? "top-1/2 left-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2"
                  : "",
              )}
            />
          </div>
          <div className="absolute top-2 right-5 z-10 h-20 w-full bg-cover bg-center font-bold">
            <img
              src={categoryImages.border}
              alt=""
              className="absolute left-50 h-full w-3/4 -translate-x-1/5 object-cover"
            />
            <div className="airstrike-normal relative top-5 left-[60%] z-100 w-full -translate-x-1/5 sm:top-4 sm:left-48 md:top-5 md:left-64">
              <h1
                className="card-name absolute text-[28px] sm:text-2xl md:text-[35px]"
                style={
                  {
                    "--card-name-content": `"${player?.player_name}"`,
                  } as React.CSSProperties
                }
              >
                {player?.player_name}
              </h1>
            </div>
          </div>

          <div className="airstrike-normal absolute top-15 right-0 z-100 text-xl text-white sm:top-12 sm:right-2 sm:text-2xl md:top-15">
            <img
              src={getCategoryImage(player?.player_category ?? "bronze")}
              alt=""
              className="h-10 w-10 object-contain sm:h-12 sm:w-12 md:h-15 md:w-15"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-1 p-2 px-4 sm:gap-2 sm:p-4 sm:px-8 md:px-12">
          <div className="absolute top-0 left-0 h-full w-full">
            {Array.from({ length: 4 }).map((_, index) => (
              <img
                key={index}
                src="/card/Asset-09.png"
                alt=""
                className="absolute top-1/2 left-0 h-1/2 w-full object-cover opacity-90"
              />
            ))}
          </div>

          <div className="flex w-full flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12">
            <div className="relative z-100 flex max-h-[120px] w-full flex-col items-center justify-center bg-contain bg-center bg-no-repeat py-2 sm:max-h-[150px] sm:py-3 md:max-h-[180px] md:py-4">
              <div className="mt-2 grid w-full grid-cols-2 gap-y-0.5 sm:mt-3 sm:gap-x-8 sm:gap-y-1 md:mt-4 md:gap-x-12">
                <div className="flex items-center justify-center leading-tight">
                  <span className="text-overgoal-blue airstrike-normal mr-1 min-w-8 text-3xl font-bold sm:mr-1.5 sm:text-2xl md:mr-2 md:min-w-12 md:text-3xl">
                    {player?.shoot}
                  </span>
                  <span className="text-overgoal-blue airstrike-normal text-3xl sm:text-2xl md:text-3xl">
                    Shoot
                  </span>
                </div>

                <div className="flex items-center justify-center leading-tight">
                  <span className="text-overgoal-blue airstrike-normal mr-1 min-w-8 text-3xl font-bold sm:mr-1.5 sm:text-2xl md:mr-2 md:min-w-12 md:text-3xl">
                    {player?.pass}
                  </span>
                  <span className="text-overgoal-blue airstrike-normal text-3xl sm:text-2xl md:text-3xl">
                    Pass
                  </span>
                </div>

                <div className="flex items-center justify-center leading-tight">
                  <span className="text-overgoal-blue airstrike-normal mr-1 min-w-8 text-3xl font-bold sm:mr-1.5 sm:text-2xl md:mr-2 md:min-w-12 md:text-3xl">
                    {player?.intelligence}
                  </span>
                  <span className="text-overgoal-blue airstrike-normal text-3xl sm:text-2xl md:text-3xl">
                    Intel.
                  </span>
                </div>

                <div className="flex items-center justify-center leading-tight">
                  <span className="text-overgoal-blue airstrike-normal mr-1 min-w-8 text-3xl font-bold sm:mr-1.5 sm:text-2xl md:mr-2 md:min-w-12 md:text-3xl">
                    {player?.agility}
                  </span>
                  <span className="text-overgoal-blue airstrike-normal text-3xl sm:text-2xl md:text-3xl">
                    Agility
                  </span>
                </div>

                <div className="flex items-center justify-center leading-tight">
                  <span className="text-overgoal-blue airstrike-normal mr-1 min-w-8 text-3xl font-bold sm:mr-1.5 sm:text-2xl md:mr-2 md:min-w-12 md:text-3xl">
                    {player?.strength}
                  </span>
                  <span className="text-overgoal-blue airstrike-normal text-3xl sm:text-2xl md:text-3xl">
                    Streght.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="airstrike-normal z-100 flex w-full items-center justify-center text-center text-xl text-white sm:text-base md:text-xl">
            {player?.player_description}
          </div>
        </div>
      </div>
    </Html>
  );
}
