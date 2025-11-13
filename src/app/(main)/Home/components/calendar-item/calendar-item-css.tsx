import { cn } from "../../../../../utils/utils";

interface Props {
  children: React.ReactNode;
  variant?: "blue" | "purple";
  className?: string;
}

export default function CalendarItemCSS({
  children,
  variant = "blue",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "calendar-item-container",
        "flex justify-center items-center w-full h-full",
        variant === "blue" ? "bg-overgoal-blue" : "bg-overgoal-purple",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
