import { useEffect, useState } from "react";
import SemiSquareContainer from "../Home/components/semi-square/semi-square-container";
import { BackButton } from "../../../components/ui/back-button";
import { Button } from "../../../components/ui/button";

export default function TournamentsScreen() {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const targetDate = new Date("2025-12-31T23:59:59").getTime(); // <-- change this

    const updateCountdown = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        setCountdown("READY!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown(); // initial render
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

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

        <span className="text-overgoal-blue font-orbitron text-center text-2xl font-bold">
          {countdown}
        </span>
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
