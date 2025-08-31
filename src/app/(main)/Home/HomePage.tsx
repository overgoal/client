// import { GameSection } from "../../../components/game-section";
import Scene from "../../../components/webgl/Scene";

export default function HomePage() {
  return (
    <div className="w-screen h-screen">
      <div className="absolute  w-screen top-0  py-2  flex items-center justify-center z-100 text-white ">
        <h1 className="text-4xl font-bold">Info</h1>
      </div>
      <Scene />
      <div className="absolute bottom-0  left-0 w-screen py-4 flex items-center justify-center z-100 text-white">
        <h1 className="text-4xl font-bold">Play Now</h1>
      </div>
    </div>
  );
}
