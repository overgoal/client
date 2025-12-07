import { cn } from "../../../../utils/utils";
import { HOME_MENU_ITEMS, SEASON_COUNTDOWN_TARGET_DATE } from "../constants";
import MenuItem from "./menu-item";
import { getIcon } from "../../../../utils/utils";
import { Countdown } from "../../../../components/ui/countdown";
import { Link } from "react-router";
import { Button } from "../../../../components/ui/button";

export default function MenuFooter() {
  return (
    <div className="home-footer relative h-full max-h-[175px] w-full bg-black">
      <div
        className={cn(
          "absolute -top-3 left-1/2 z-100 h-full max-h-[73px] w-full max-w-[236px] -translate-x-1/2",
          "flex items-center justify-center",
          "bg-[url('/homepage/play_button.svg')] bg-contain bg-center",
          "disabled:opacity-90",
        )}
      >
        {!import.meta.env.DEV ? (
          <div className="flex flex-col items-center justify-center">
            <span className="font-orbitron text-base text-white">
              Season 0 Starts:
            </span>
            <Countdown
              targetDate={SEASON_COUNTDOWN_TARGET_DATE}
              className="text-overgoal-blue font-orbitron text-center text-xl font-bold"
              readyText="SEASON IS LIVE!"
            />
          </div>
        ) : (
          <Link to="/pre-match/1" className="">
            <Button className="h-full w-full" asChild={true}>
              <p className="airstrike-normal !text-5xl text-white uppercase">
                Play
              </p>
            </Button>
          </Link>
        )}
      </div>
      <div className="relative flex h-full w-full flex-row items-end justify-center gap-8 p-4 text-white">
        {HOME_MENU_ITEMS.map((item) => (
          <MenuItem
            key={item.title}
            title={item.title}
            icon={getIcon(item.iconName)}
            href={item.href}
            disabled={item.disabled}
          />
        ))}
      </div>
    </div>
  );
}
