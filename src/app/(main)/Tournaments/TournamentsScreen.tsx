import SemiSquareContainer from "../Home/components/semi-square/semi-square-container";
import { BackButton } from "../../../components/ui/back-button";
import { Button } from "../../../components/ui/button";
import { Countdown } from "../../../components/ui/countdown";
import { SEASON_COUNTDOWN_TARGET_DATE } from "../Home/constants";

export default function TournamentsScreen() {
  // Target date for tournament start
  const targetDate = SEASON_COUNTDOWN_TARGET_DATE;

  return (
    <div className="relative flex h-lvh w-full flex-col items-center justify-center gap-8 bg-[url('/backgrounds/glitch-bg.webp')] bg-cover bg-center px-12">
      <BackButton to="/" className="absolute top-5 left-0" />

      <SemiSquareContainer
        className="absolute top-[15%] right-[75%] z-100 h-18 w-18"
        bgColor="#19001d"
        noShadow
        borderColor="#9400ff"
      >
        <img
          src="/icons/Players-joined.webp"
          alt=""
          className="ml-4 h-[60%] w-[60%] object-contain object-center"
        />
      </SemiSquareContainer>

      <SemiSquareContainer
        className="absolute top-[30%] right-[75%] z-100 flex h-18 w-18 items-center justify-center"
        bgColor="#19001d"
        noShadow
        borderColor="#9400ff"
      >
        <img
          src="/icons/Current-prize.webp"
          alt=""
          className="ml-4 h-[60%] w-[60%] object-contain object-center"
        />
      </SemiSquareContainer>

      <SemiSquareContainer
        className="absolute top-[45%] right-[75%] z-100 h-18 w-18"
        bgColor="#19001d"
        noShadow
        borderColor="#9400ff"
      >
        <img
          src="/icons/Coins.webp"
          alt=""
          className="ml-4 h-[60%] w-[60%] object-contain object-center"
        />
      </SemiSquareContainer>

      <SemiSquareContainer
        className="relative mt-10 h-[300px] w-full"
        bgColor="#19001d"
        noShadow
        borderColor="#9400ff"
      >
        <div className="ml-6 flex h-full w-full flex-col items-center justify-center gap-8 px-4">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-orbitron text-center text-base font-bold text-white">
              Players joined:
            </span>
            <span className="text-overgoal-blue font-orbitron text-center text-2xl font-bold">
              -
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <span className="font-orbitron text-center text-base font-bold text-white">
              Current prize:
            </span>
            <span className="text-overgoal-blue font-orbitron text-center text-2xl font-bold">
              -
            </span>
          </div>
          <div className="flex flex-col items-center jusrtify-center gap-1">
            <span className="font-orbitron text-center text-base font-bold text-white">
              Entry fee:
            </span>
            <span className="text-overgoal-blue font-orbitron text-center text-2xl font-bold">
              -
            </span>
          </div>
        </div>
      </SemiSquareContainer>

      <div className="mt-2 flex w-full flex-col items-center justify-center gap-2">
        <h2 className="font-orbitron text-center text-xl font-bold text-white uppercase">
          Next Starts in:
        </h2>

        <Countdown
          targetDate={targetDate}
          className="text-overgoal-blue font-orbitron text-center text-2xl font-bold"
          readyText="READY!"
        />
      </div>

      <Button
        variant="outline"
        className="bg-overgoal-dark-blue/90 mt-10 mb-4 text-white"
      >
        <span className="font-orbitron text-base font-bold text-white uppercase">
          Get Early Access
        </span>
      </Button>
    </div>
  );
}
