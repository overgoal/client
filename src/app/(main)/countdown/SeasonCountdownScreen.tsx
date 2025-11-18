import { useEffect, useState } from "react";
import { Countdown } from "../../../components/ui/countdown";
import { Button } from "../../../components/ui/button";
import { SEASON_COUNTDOWN_TARGET_DATE } from "../Home/constants";
import { Link } from "react-router";
import { GlitchText } from "../../../components/ui/glitch-text";
import LoadingScreen from "../../../components/loader/LoadingScreen";

export default function SeasonCountdownScreen() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Set target date for next season (you can adjust this date as needed)
  const targetDate = SEASON_COUNTDOWN_TARGET_DATE;

  useEffect(() => {
    // Simulate loading time for the congratulations screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen isLoading={true} />;
  }

  return (
    <div className="relative flex h-lvh w-full flex-col items-center justify-center gap-8 bg-[url('/backgrounds/glitch-bg.webp')] bg-cover bg-center px-12">
      {/* Devconnect Logo */}
      <div className="flex flex-col items-center justify-center gap-2">
        <GlitchText text="Congratulations!" className="text-3xl" />
        <h3 className="font-orbitron mt-4 text-center text-2xl leading-tight font-bold text-white uppercase">
          You claimed your{" "}
          <span className="text-overgoal-blue underline underline-offset-2">
            unique pre-season
          </span>{" "}
          Player Card!
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

      <Link to="/">
        <Button
          variant="outline"
          className="bg-overgoal-dark-blue/90 text-white"
        >
          <span className="font-orbitron text-base font-bold text-white uppercase">
            Continue
          </span>
        </Button>
      </Link>
    </div>
  );
}
