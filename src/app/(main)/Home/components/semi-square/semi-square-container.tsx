import { cn } from "../../../../../utils/utils";

interface Props {
  children: React.ReactNode;
  bgColor?: string;
  borderColor?: string;
  className?: string;
  noShadow?: boolean;
}

export default function SemiSquareContainer({
  children,
  bgColor = "black",
  borderColor = "var(--color-overgoal-blue)",
  className,
  noShadow = false,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-[66px] flex justify-center items-center max-h-[64px] w-full h-full",
        "relative overflow-hidden",
        className,
      )}
      style={{
        backgroundColor: borderColor,
        clipPath: "polygon(16% 0, 100% 0, 100% 100%, 0 100%, 0 15%)",
      }}
    >
      <div
        className={cn(
          "absolute w-[98%] h-[98%] ",
          noShadow
            ? "shadow-none"
            : "shadow-[inset_0_0px_8px_rgba(3,228,232,100)]",
        )}
        style={{
          backgroundColor: bgColor,
          clipPath: "polygon(16% 0, 100% 0, 100% 100%, 0 100%, 0 15%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
