import { cn } from "../../../../utils/utils";

interface Props {
  children: React.ReactNode;
  bgColor?: string;
  borderColor?: string;
  className?: string;
  noShadow?: boolean;
}

export default function CalendarItem({
  children,
  bgColor = "black",
  borderColor = "var(--color-overgoal-blue)",
  className,
  noShadow = false,
}: Props) {
  return (
    <div
      className={cn(
        "flex justify-center items-center w-full h-full",
        "relative overflow-hidden",
        className
      )}
      style={{
        backgroundColor: borderColor,
        clipPath: "polygon(87% 0, 100% 12%, 100% 100%, 75% 100%, 12% 100%, 0 87%, 0 0)",
      }}
    >
      <div
        className={cn(
          "absolute w-[98%] h-[98%]",
          noShadow ? "shadow-none" : "shadow-[inset_0_0px_8px_rgba(3,228,232,100)]"
        )}
        style={{
          backgroundColor: bgColor,
          clipPath: "polygon(87% 0, 100% 12%, 100% 100%, 75% 100%, 12% 100%, 0 87%, 0 0)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-start gap-2 mb-4">{children}</div>
    </div>
  );
}
