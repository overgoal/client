import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string | Date;
  onComplete?: () => void;
  className?: string;
  readyText?: string;
}

export function Countdown({ 
  targetDate, 
  onComplete, 
  className = "", 
  readyText = "READY!" 
}: CountdownProps) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const target = typeof targetDate === 'string' 
      ? new Date(targetDate).getTime() 
      : targetDate.getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown(readyText);
        onComplete?.();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown(); // initial render
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete, readyText]);

  return (
    <span className={className}>
      {countdown}
    </span>
  );
}
