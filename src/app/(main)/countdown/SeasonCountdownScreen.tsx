import { Countdown } from "../../../components/ui/countdown";
import { BackButton } from "../../../components/ui/back-button";
import { Button } from "../../../components/ui/button";
import { SEASON_COUNTDOWN_TARGET_DATE } from "../Home/constants";

export default function SeasonCountdownScreen() {
  // Set target date for next season (you can adjust this date as needed)
  const targetDate = SEASON_COUNTDOWN_TARGET_DATE;

  return (
    <div className="relative flex h-lvh w-full flex-col items-center justify-center gap-8 bg-[url('/backgrounds/glitch-bg.webp')] bg-cover bg-center px-12">
      <BackButton to="/" className="absolute top-5 left-0" />

      {/* Devconnect Logo */}
      <div className="mt-12 flex flex-col items-center justify-center gap-2">
        <h1 className="font-orbitron text-center text-2xl leading-tight font-bold text-white uppercase">
          Congratulations!
        </h1>
        <h3 className="font-orbitron text-center text-2xl leading-tight font-bold text-white uppercase">
          Your claimed your unique pre-season Player Card!
        </h3>
      </div>
      {/* <img
        src="/homepage/dev.webp"
        alt="Devconnect Logo"
        className="mb-8 h-12 w-12 object-contain object-center"
      /> */}

      {/* Main Label */}
      <h1 className="font-orbitron mb-8 text-center text-2xl leading-tight font-bold text-white uppercase">
        Get ready to the next season!
      </h1>

      {/* Countdown */}
      <Countdown
        targetDate={targetDate}
        className="text-overgoal-blue font-orbitron text-center text-3xl font-bold"
        readyText="SEASON IS LIVE!"
      />

      <Button variant="outline" className="bg-overgoal-dark-blue/90 text-white">
        <span className="font-orbitron text-base font-bold text-white uppercase">
          Continue
        </span>
      </Button>
    </div>
  );
}
