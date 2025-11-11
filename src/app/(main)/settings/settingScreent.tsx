import { BackButton } from "../../../components/ui/back-button";
import { Button } from "../../../components/ui/button";

type Props = {};

export default function SettingsScreen({}: Props) {
  return (
    <div className="flex h-dvh w-screen flex-col items-start justify-start gap-10 bg-[url('/backgrounds/glitch-bg.webp')] bg-cover bg-center px-4">
      <BackButton to="/" className="absolute top-5 left-0" />
      <div className="bg-overgoal-dark-blue/90 mt-24 flex w-full flex-row items-center justify-between gap-4">
        <div className="bg-overgoal-blue relative h-10 w-3"></div>
        <span className="font-orbitron mr-auto text-base font-bold text-white uppercase">
          profile
        </span>
        <div className="bg-overgoal-blue relative h-10 w-3"></div>
      </div>

      <div className="flex w-full items-center justify-center">
        <Button
          variant="outline"
          className="bg-overgoal-dark-blue/90 text-white"
        >
          <span className="font-orbitron text-base font-bold text-white uppercase">
            Disconnect
          </span>
        </Button>
      </div>
    </div>
  );
}
