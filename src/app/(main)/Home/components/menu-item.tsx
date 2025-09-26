import React from "react";
import { cn } from "../../../../utils/utils";
import { Button } from "../../../../components/ui/button";

type MenuItemProps = {
  title: string;
  icon: React.ReactNode;
};

const MenuItem = (props: MenuItemProps) => {
  return (
    <div
      className={cn(
        "bg-black max-w-[66px] flex justify-center  items-center max-h-[64px] w-full h-full",
        "menu-item"
      )}
    >
      <Button  className="flex flex-col relative  justify-between p-3 items-center h-full w-full">
        {props.icon}
        <p className="text-[10px] text-white uppercase orbitron-medium">
          {props.title}
        </p>
      </Button>
    </div>
  );
};

export default MenuItem;
