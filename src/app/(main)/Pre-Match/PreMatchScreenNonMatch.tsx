import { BackButton } from "../../../components/ui/back-button";
import PrematchOptions from "./components/pre-match-option";

import preMatchBackground from "/backgrounds/glitch-bg.webp";

const PreNonMatchScreen = () => {
  return (
    <div className="w-full h-screen p-4 bg-overgoal-dark-blue">
      <img
        src={preMatchBackground}
        alt="pre-match-background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="w-full flex flex-col items-center justify-between z-100! relative">
        <BackButton className="w-12 h-12 mr-auto" to="/" />

        <div className="w-full pt-16 flex flex-col items-center justify-center  gap-12 z-100! h-full ">
          <div className="w-full max-w-2xl mx-auto px-4 text-white text-center text-sm leading-[120%] orbitron-medium">
            <div className="relative w-[300px] mx-auto">
              <img
                src="/backgrounds/container.webp"
                alt="container"
                className="-rotate-90 object-cover absolute -top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3  scale-70  "
              />
              <p className="text-white absolute inset-0 top-10  text-center text-sm leading-[120%] orbitron-medium z-100">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente eaque iusto est non deleniti deserunt consequatur
                tempore libero quae minima eius vero cum sit ullam, quasi eos
                nobis pariatur aspernatur!
              </p>
            </div>
            <div className="relative mt-auto h-full w-full  -bottom-60 z-100">
              <PrematchOptions className=" " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PreNonMatchScreen.displayName = "PreNonMatchScreen";
export default PreNonMatchScreen;
