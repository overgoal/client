import { BackButton } from "../../../components/ui/back-button";
import { Button } from "../../../components/ui/button";
import { Link } from "react-router";
import { cn } from "../../../utils/utils";
import preMatchBackground from "/backgrounds/glitch-bg.webp";
import PreMatchTeam from "./components/pre-match-team";
import SemiSquareContainer from "../Home/components/semi-square/semi-square-container";
import CyberContainer from "../Home/components/cyber-container";
import { GlitchText } from "../../../components/ui/glitch-text";
import { StaminaBar } from "../../../components/ui/stamina-bar";

export default function PreMatchScreen() {
  return (
    <div className="bg-overgoal-dark-blue h-full min-h-dvh w-full p-4">
      <img
        src={preMatchBackground}
        alt="pre-match-background"
        className="absolute inset-0 z-0 h-screen min-h-dvh w-full object-cover"
      />
      <div className="relative z-100! flex w-full flex-col items-center justify-between">
        <BackButton className="mr-auto h-12 w-12" to="/" />

        <div className="z-100! flex h-full w-full flex-col items-center justify-center gap-4 py-8">
          <GlitchText className="text-2xl" text="Get ready to play" />

          <div className="relative flex h-full w-full flex-row items-center justify-center gap-1">
            <PreMatchTeam
              teamName="Dojo United"
              teamImage="https://via.placeholder.com/150"
              side="left"
              isMyTeam={true}
            />

            <span className="font-orbitron text-2xl font-bold text-white uppercase">
              vs
            </span>

            <PreMatchTeam
              teamName="Cartridge City"
              teamImage="https://via.placeholder.com/150"
              side="right"
              isMyTeam={false}
            />
          </div>

          <div className="border-overgoal-positive flex w-full flex-row items-center justify-between gap-4 border-1 bg-[#002601] p-2 text-center text-white">
            <img
              src="/logo.png"
              alt="stamina"
              className="h-16 w-16 object-cover"
            />
            <div className="flex h-10 w-full items-center justify-end">
              <CyberContainer className="!h-[65%] !w-full">
                <StaminaBar value={10} className="h-full w-full" />
              </CyberContainer>
            </div>
            <div className="flex flex-row gap-2">
              <SemiSquareContainer
                bgColor="#002601"
                noShadow={true}
                borderColor="var(--color-overgoal-positive)"
                className="h-10 w-10"
              >
                <div className="hidden">a</div>
              </SemiSquareContainer>
              <SemiSquareContainer
                bgColor="#002601"
                borderColor="var(--color-overgoal-positive)"
                noShadow={true}
                className="h-10 w-10"
              >
                <div className="hidden">a</div>
              </SemiSquareContainer>
              <SemiSquareContainer
                bgColor="#002601"
                borderColor="var(--color-overgoal-positive)"
                noShadow={true}
                className="h-10 w-10"
              >
                <div className="hidden">a</div>
              </SemiSquareContainer>
            </div>
          </div>

          <div
            className={cn(
              "z-100 mt-3 h-full max-h-[73px] w-full max-w-[236px]",
              "flex items-center justify-center",
              "bg-[url('/homepage/play_button.svg')] bg-contain bg-center bg-no-repeat",
            )}
          >
            <Link to="/pre-match/1">
              <Button className="h-full w-full" asChild={true}>
                <p className="airstrike-normal !text-5xl text-white uppercase">
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
