import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../utils/utils";
import { UserIcon } from "lucide-react";

export const LifestylesButton = () => {
  return (
    <div
      className={cn(
        "max-w-[85px] max-h-[97px] w-full h-full flex flex-col gap-1 items-center justify-center p-2",
        "lifestyle-container",
        "ml-auto"
      )}
    >
      <Button className="lifestyle-inner-container w-full h-full p-4 flex flex-col gap-2 items-center justify-center">
        <UserIcon className="w-4 h-4 text-white" />
        <p className="text-white uppercase orbitron-medium text-[8px]">
          Lifestyle
        </p>
      </Button>
    </div>
  );
};
