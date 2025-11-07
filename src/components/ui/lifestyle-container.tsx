import { ReactNode } from "react";
import { Button } from "./button";
import { Link } from "react-router";
import { getIcon } from "../../utils/iconMap";
import { cn } from "../../utils/utils";

interface HomeMenuItemProps {
  borderColor?: string;
  backgroundColor?: string;
  position?: "left" | "right";
  className?: string;
  href?: string;
  icon?: string;
  title?: string;
  size?: "small" | "large";
}

export function HomeMenuItem({
  borderColor = "var(--color-overgoal-light-blue)",
  backgroundColor = "#0b3d41",
  position = "left",
  className = "",
  href = "/calendar",
  icon = "Calendar",
  title = "Calendar",
  size = "large",
}: HomeMenuItemProps) {
  const clipClass =
    position === "left" ? "lifestyle-clip-left" : "lifestyle-clip-right ";

  const containerSize =
    size === "small"
      ? "max-w-[80px] max-h-[90px]"
      : "max-w-[90px] max-h-[97px]";

  return (
    <div
      className={`lifestyle-container
             ${containerSize} ${position === "left" ? "ml-auto" : "mr-auto"} w-full h-full flex flex-col gap-1 items-center justify-center p-2
        ${clipClass} ${className}`}
      style={
        {
          "--lifestyle-border-color": borderColor,
          "--lifestyle-bg-color": backgroundColor,
        } as React.CSSProperties
      }
    >
      <div className="lifestyle-inner-container w-full h-full">
        <Link to={href}>
          <Button className="lifestyle-inner-container w-full h-full p-4 flex flex-col gap-2 items-center  justify-center">
            <div className={cn("flex flex-col gap-2 items-center justify-center ", position === "left" ? "-rotate-10" : "rotate-10")}>
              <img
                src={getIcon(icon as keyof typeof getIcon)}
                alt={title}
                className={cn("w-6  h-6 -rotate-2", position === "left" ? "-rotate-2" : "-rotate-2")}
              />
              <p className={cn("text-white uppercase orbitron-medium rotate-2 text-[7px]", position === "left" ? "rotate-2" : "-rotate-2")}>
                {title}
              </p>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
}
