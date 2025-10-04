import { SettingsIcon } from "lucide-react";
import CyberContainer from "./cyber-container";
import { LifestylesButton } from "./lifestyle-button";
import { Button } from "../../../../components/ui/button";

export default function MenuNav() {
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

          <div className="flex items-center justify-start  w-full h-full gap-3 mb-4">
            <div className="flex flex-col  w-1/4 h-2/4 gap-px !mb-2">
              <p className="font-orbitron font-normal text-overgoal-blue text-[8px] uppercase pl-1">
                {" "}
                level{" "}
              </p>
              <CyberContainer className="!w-full !h-[65%]"> </CyberContainer>
            </div>

            <CyberContainer className="!w-2/4 !h-1/3 pl-3 flex flex-row items-center justify-between  ">
              <svg
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8843 3.66923L10.6168 0.15C10.5271 0.0538462 10.4006 0 10.266 0H3.73511C3.6005 0 3.47404 0.0538462 3.38429 0.15L0.116812 3.66923C-0.0422787 3.83846 -0.0381994 4.09615 0.124971 4.25769L6.65994 10.8577C6.83534 11.0346 7.12905 11.0462 7.32078 10.8808C7.32893 10.8731 7.33709 10.8654 7.34525 10.8577L13.8802 4.25769C14.0434 4.09231 14.0475 3.83846 13.8884 3.66923H13.8843ZM12.5055 3.51923H10.0335L7.93266 0.880769H10.0539L12.5055 3.51923ZM3.88604 4.4L5.6442 8.54231L1.54047 4.4H3.88196H3.88604ZM9.11157 4.4L7.00259 9.37692L4.89362 4.4H9.11565H9.11157ZM5.13429 3.51923L7.00259 1.17308L8.87089 3.51923H5.13837H5.13429ZM10.1191 4.4H12.4606L8.36098 8.54231L10.1191 4.4ZM3.94723 0.880769H6.06844L3.96763 3.51923H1.4956L3.94723 0.880769Z"
                  fill="#00EDF7"
                />
              </svg>
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
