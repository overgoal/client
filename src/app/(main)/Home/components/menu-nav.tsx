import { SettingsIcon, UserIcon } from "lucide-react";
import CyberContainer from "./cyber-container";
import { LifestylesButton } from "./lifestyle-button";
import { Button } from "../../../../components/ui/button";

type Props = {};

export default function MenuNav({}: Props) {
  return (
    <div className="w-full max-h-1/4 h-full p-4 flex flex-col items-start justify-start mt-2">
      <div className="flex flex-col gap-4  w-full ">
        <div className="w-full flex flex-row gap-2 items-center justify-start ">
          <div className="max-w-[90px] max-h-[90px] w-full h-full">
            <img
              src="/homepage/profile_container.svg"
              alt="profile_container"
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="flex items-center justify-start  w-full h-full gap-4 mb-4">
            <div className="flex flex-col  w-1/4 h-2/4 gap-px !mb-2">
              <p className="font-orbitron font-normal text-overgoal-blue text-[8px] uppercase pl-1"> level </p>
              <CyberContainer className="!w-full !h-[65%]"> </CyberContainer>
            </div>

            <CyberContainer className="!w-2/4 !h-1/3  flex flex-row items-center justify-between  ">
              <UserIcon className="w-4 h-4 text-white opacity-100  " />
              <h2 className="text-white text-sm  font-orbitron font-medium">
                5000
              </h2>
              <div className="w-1/3 h-full  bg-[#0b3d41] cyberpunk-clip"></div>
            </CyberContainer>
            <div className="bg-[url('/homepage/button_settings.svg')] bg-contain bg-center w-1/5 h-1/2 bg-no-repeat flex items-center justify-center">
              <Button className="w-full h-full">
                <SettingsIcon className="w-6 h-6 text-white opacity-100  " />
              </Button>
            </div>
          </div>
        </div>
        <LifestylesButton />
      </div>
    </div>
  );
}
