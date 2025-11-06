import React from "react";
import { cn } from "../../../../utils/utils";

type Props = {
  className: string;
  children: React.ReactNode;
};

export default function CyberContainer({ className, children }: Props) {
  return (
    <div className={cn(" cyber-container p-1   ", className)}>{children}</div>
  );
}
