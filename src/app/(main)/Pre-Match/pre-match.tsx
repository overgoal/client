import { BackButton } from "../../../components/ui/back-button";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router";
import { cn } from "../../../utils/utils";
import preMatchBackground from "/backgrounds/glitch-bg.jpg";
import PreMatchTeam from "./components/pre-match-team";
import SemiSquareContainer from "../Home/components/semi-square/semi-square-container";
import CyberContainer from "../Home/components/cyber-container";

export default function PreMatchScreen() {
  return (
    <div className="w-full min-h-dvh h-full  p-4 bg-overgoal-dark-blue">
      <img
        src={preMatchBackground}
        alt="pre-match-background"
        className="absolute inset-0 w-full min-h-dvh h-screen object-cover z-0"
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

          <div className="w-full flex flex-row items-center justify-between gap-4  text-center text-white p-4 border-1 bg-[#002601] border-overgoal-positive">
            <div className=" relative  w-10 h-10 bg-amber-50">
              <div className="absolute  bg-amber-50">
                <img
                  src="/pre-match/stamina.png"
                  alt="stamina"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full h-10 flex items-center justify-center">
              <CyberContainer className="!w-3/4 !h-[65%]"> </CyberContainer>
            </div>
            <div className="flex flex-row gap-2">
              <SemiSquareContainer
                bgColor="#002601"
                noShadow={true}
                borderColor="var(--color-overgoal-positive)"
                className="w-10 h-10"
              >
                hola
              </SemiSquareContainer>
              <SemiSquareContainer
                bgColor="#002601"
                borderColor="var(--color-overgoal-positive)"
                noShadow={true}
                className="w-10 h-10"
              >
                hola
              </SemiSquareContainer>
              <SemiSquareContainer
                bgColor="#002601"
                borderColor="var(--color-overgoal-positive)"
                noShadow={true}
                className="w-10 h-10"
              >
                hola
              </SemiSquareContainer>
            </div>
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
