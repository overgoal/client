import { LoginPlayer } from "./components/login-player";

export default function LoginScreen() {


  return (
    <div className="h-screen w-screen px-12 flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <h2 className="text-2xl font-bold text-white">Login</h2>


      <div className="w-full max-w-md">
        <LoginPlayer />
      </div>
    </div>
  );
}
