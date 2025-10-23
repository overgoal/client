import React from "react";
import { cn } from "../../../../utils/utils";
import { Button } from "../../../../components/ui/button";
import { Link } from "react-router";

type MenuItemProps = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

const MenuItem = (props: MenuItemProps) => {
  return (
    <div
      className={cn(
        "bg-black max-w-[66px] flex justify-center  items-center max-h-[64px] w-full h-full",
        "menu-item"
      )}
    >
      <Link to={props.href}>
        <Button className="flex flex-col relative  justify-between p-3 items-center h-full w-full">
          {props.icon}
          <p className="text-[10px] text-white uppercase orbitron-medium">
            {props.title}
          </p>
        </Button>
      </Link>
    </div>
  );
};

export default MenuItem;
