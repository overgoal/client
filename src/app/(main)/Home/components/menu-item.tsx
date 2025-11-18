import React from "react";
import { cn } from "../../../../utils/utils";
import { Button } from "../../../../components/ui/button";
import { Link } from "react-router";

type MenuItemProps = {
  title: string;
  icon: React.ReactNode;
  href: string;
  disabled?: boolean;
};

const MenuItem = (props: MenuItemProps) => {
  return (
    <div
      className={cn(
        "flex h-full max-h-[70px] w-full max-w-[75px] items-center justify-center bg-[#170028]",
        "menu-item",
      )}
    >
      <Link to={props.href}>
        <Button
          disabled={props.disabled}
          className="relative flex h-full w-full flex-col items-center justify-center gap-1 p-3"
        >
          <img
            src={props.icon as string}
            alt={props.title}
            className="h-6 w-6"
          />
          <p className="font-orbitron text-[11px] text-white">{props.title}</p>
        </Button>
      </Link>
    </div>
  );
};

export default MenuItem;
