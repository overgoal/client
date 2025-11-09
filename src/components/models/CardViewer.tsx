import React from "react";
import { PlayerData } from "./ChangeableModels";
import { cn } from "../../utils/utils";
import { mapCardBorderTexture } from "../../utils/mapTeamTexture";
import QRCode from "react-qr-code";

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
    <div className="pointer-events-none h-dvh w-full">
      <div className="flex h-full w-full flex-col items-center justify-between">
        <div className="flex w-full flex-row items-center justify-start gap-4 px-4 pt-4">
          <img
            src="/card/Asset-08.png"
            alt=""
            className="absolute top-0 left-0 h-full w-full object-cover"
          />
          <div className="absolute -top-4 -left-4 z-100 h-42 w-42 rounded-full bg-black bg-[url('/card/Asset-02.png')] bg-cover bg-center">
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
          <div className="absolute top-0 z-10 h-24 w-full bg-cover bg-center font-bold">
            <img
              src={categoryImages.border}
              alt=""
              className="absolute left-50 h-full w-3/4 -translate-x-1/5 object-cover"
            />
            <div className="airstrike-normal relative top-5 left-64 z-100 w-full -translate-x-1/5">
              <h1
                className="card-name absolute text-[35px]"
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

          <div className="airstrike-normal absolute top-15 right-2 z-100 text-2xl text-white">
            <img
              src={getCategoryImage(player?.player_category ?? "bronze")}
              alt=""
              className="h-15 w-15 object-contain"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 p-4 px-12">
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

          <div className="flex w-full flex-row items-center justify-center gap-12">
            <div className="relative z-100 flex items-center justify-center">
              <img
                src={categoryImages.qr}
                alt=""
                className={cn(
                  "h-36 w-36 object-contain",
                  player?.player_category === "gold"
                    ? "translate-y-2 scale-130 object-bottom"
                    : "",
                )}
              />
              <div className="absolute overflow-hidden bg-contain bg-center bg-no-repeat">
                <QRCode
                  size={120}
                  value={`https://play.overgoal.gg/claim/${player?.linkID}`}
                  className="overflow-hidden"
                />
              </div>
            </div>

            <div className="relative z-100 flex max-h-[180px] flex-1 flex-col items-center justify-center bg-contain bg-center bg-no-repeat py-4">
              <div className="mt-4 grid grid-cols-2 gap-x-12 gap-y-1">
                <div className="leading-tight">
                  <span className="text-overgoal-blue airstrike-normal mr-2 min-w-[3rem] text-3xl font-bold">
                    {player?.shoot}
                  </span>
                  <span className="text-overgoal-blue airstrike-normal text-3xl">
                    Shoot
                  </span>
                </div>

                <div className="leading-tight">
                  <span className="text-overgoal-blue airstrike-normal mr-2 min-w-[3rem] text-3xl font-bold">
                    {player?.pass}
                  </span>
                  <span className="text-overgoal-blue airstrike-normal text-3xl">
                    Pass
                  </span>
                </div>

                <div className="leading-tight">
                  <span className="text-overgoal-blue airstrike-normal mr-2 min-w-[3rem] text-3xl font-bold">
                    {player?.intelligence}
                  </span>
                  <span className="text-overgoal-blue airstrike-normal text-3xl">
                    Intel.
                  </span>
                </div>

                <div className="leading-tight">
                  <span className="text-overgoal-blue airstrike-normal mr-2 min-w-[3rem] text-3xl font-bold">
                    {player?.agility}
                  </span>
                  <span className="text-overgoal-blue airstrike-normal text-3xl">
                    Agility
                  </span>
                </div>

                <div className="leading-tight">
                  <span className="text-overgoal-blue airstrike-normal mr-2 min-w-[3rem] text-3xl font-bold">
                    {player?.strength}
                  </span>
                  <span className="text-overgoal-blue airstrike-normal text-3xl">
                    Streght.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="airstrike-normal z-100 flex w-full items-center justify-center text-center text-xl text-white">
            <div>{player?.player_description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
