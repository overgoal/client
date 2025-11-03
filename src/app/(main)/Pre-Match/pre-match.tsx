import { BackButton } from "../../../components/ui/back-button";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router";
import { cn } from "../../../utils/utils";
import preMatchBackground from "/backgrounds/glitch-bg.jpg";
import PreMatchTeam from "./components/pre-match-team";

export default function PreMatchScreen() {
  return (
    <div className="w-full h-screen p-4 bg-overgoal-dark-blue">
      <img
        src={preMatchBackground}
        alt="pre-match-background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="w-full flex flex-col items-center justify-between z-100! relative">
        <BackButton className="w-12 h-12 mr-auto" to="/" />

        <div className="w-full py-8 flex flex-col items-center justify-center gap-12 z-100! h-full">
          <h1 className="text-white text-2xl font-bold   font-orbitron">
            Get ready to play
          </h1>

          <div className="flex flex-row w-full items-center h-full   gap-1  justify-center relative ">
            <PreMatchTeam
              teamName="Dojo United"
              teamImage="https://via.placeholder.com/150"
              side="left"
              isMyTeam={true}
            />

            <span className="uppercase text-white text-2xl font-bold  font-orbitron">
              vs
            </span>

            <PreMatchTeam
              teamName="Cartridge City"
              teamImage="https://via.placeholder.com/150"
              side="right"
              isMyTeam={false}
            />
          </div>

          <div className="w-full text-center text-white px-4">
            iae impedit adipisci perferendis nisi consequatur consectetur?
            Perspiciatis harum repellat obcaecati omnis.
          </div>

          <div
            className={cn(
              "max-w-[236px] max-h-[73px] w-full h-full z-100 ",
              "flex items-center justify-center",
              "bg-[url('/homepage/play_button.svg')] bg-no-repeat bg-contain bg-center"
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
        </div>
      </div>
    </div>
  );
}
