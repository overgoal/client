import { cva } from "class-variance-authority";
import { cn } from "../../utils/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
  isSingleSide: boolean;
  color?: "blue" | "purple";
};

const variants = cva("", {
  variants: {
    color: {
      blue: "bg-overgoal-blue",
      purple: "bg-overgoal-purple",
    },
    isSingleSide: {
      true: "box-container-single-side",
      false: "box-container",
    },
  },
});

export default function BoxContainer({
  className = "",
  children,
  isSingleSide,
  color = "blue",
}: Props) {
  return (
    <div className={cn("p-4", className, variants({ isSingleSide, color }))}>
      {children}
    </div>
  );
}
