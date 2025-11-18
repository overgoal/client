import { BackButton } from "../../../components/ui/back-button";
import { cn } from "../../../utils/utils";
import preMatchBackground from "/backgrounds/glitch-bg.webp";
import PreMatchTeam from "./components/pre-match-team";
import SemiSquareContainer from "../Home/components/semi-square/semi-square-container";
import CyberContainer from "../Home/components/cyber-container";
import { GlitchText } from "../../../components/ui/glitch-text";
import { StaminaBar } from "../../../components/ui/stamina-bar";
import { Countdown } from "../../../components/ui/countdown";
import { SEASON_COUNTDOWN_TARGET_DATE } from "../Home/constants";

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
              teamImage="/teams/dojoUnited.webp"
              side="left"
              isMyTeam={true}
            />

            <span className="font-orbitron text-2xl font-bold text-white uppercase">
              vs
            </span>

            <PreMatchTeam
              teamName="Cartridge City"
              teamImage="/teams/Cartridge City.webp"
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
              "z-100 mt-2 flex h-full w-full flex-col items-center justify-center gap-2",
              "flex items-center justify-center",
            )}
          >
            <GlitchText text="Next Season Starts in:" className="text-xl" />
            <Countdown
              targetDate={SEASON_COUNTDOWN_TARGET_DATE}
              className="text-overgoal-blue font-orbitron text-center text-3xl font-bold"
              readyText="SEASON IS LIVE!"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
