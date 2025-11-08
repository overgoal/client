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
        "bg-[#170028] max-w-[75px] flex justify-center items-center max-h-[70px] w-full h-full",
        "menu-item"
      )}
    >
      <Link to={props.href}>
        <Button className="flex flex-col relative gap-1  justify-center p-3 items-center h-full w-full">
          <img src={props.icon as string} alt={props.title} className="w-6 h-6" />
          <p className="text-[11px] text-white  font-orbitron">
            {props.title}
          </p>
        </Button>
      </Link>
    </div>
  );
};

export default MenuItem;
