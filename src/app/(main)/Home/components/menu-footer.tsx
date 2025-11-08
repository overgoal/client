import { cn } from "../../../../utils/utils";
import { Button } from "../../../../components/ui/button";
import { HOME_MENU_ITEMS } from "../constants";
import MenuItem from "./menu-item";
import { Link } from "react-router";
import { getIcon } from "../../../../utils/utils";



export default function MenuFooter() {
  return (
    <div className="relative w-full bg-black max-h-[175px] h-full home-footer ">
      <div
        className={cn(
          "max-w-[236px] max-h-[73px] w-full h-full absolute left-1/2 -translate-x-1/2 z-100 -top-3 ",
          "flex items-center justify-center",
          "bg-[url('/homepage/play_button.svg')] bg-contain bg-center",
        )}
      >
        <Link to="/pre-match/1">
          <Button className="w-full h-full " asChild={true}>
            <p className="text-white !text-5xl  uppercase airstrike-normal">
              Play
            </p>
          </Button>
        </Link>
      </div>
      <div className="flex flex-row items-end justify-center gap-8  relative h-full w-full text-white  p-4">
        {HOME_MENU_ITEMS.map((item) => (
          <MenuItem
            key={item.title}
            title={item.title}
            icon={getIcon(item.iconName)}
            href={item.href}
          />
        ))}
      </div>
    </div>
  );
}
