import { GlitchText } from "../../../components/ui/glitch-text";
import { LoginPlayer } from "./components/login-player";

export default function LoginScreen() {
  return (
    <div className="h-dvh w-screen px-12 flex flex-col items-center justify-center gap-24 bg-[url('/login/background.webp')] bg-cover bg-center ">
      <div className="flex flex-col items-center justify-center">
        <img src="/logo.png" alt="Overgoal" className="w-42 h-42 " />
        <GlitchText className="text-5xl" text="Overgoal" />
      </div>

      <div className="w-full max-w-md">
        <LoginPlayer />
      </div>
    </div>
  );
}
