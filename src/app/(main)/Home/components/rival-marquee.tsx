import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SEASON_COUNTDOWN_TARGET_DATE } from "../constants";

export default function RivalMarquee() {
  const root = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  const daysUntilSeasonStart = Math.floor(
    (new Date(SEASON_COUNTDOWN_TARGET_DATE).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  useGSAP(() => {
    if (!inner.current) return;

    const [content1, content2] = inner.current.querySelectorAll(
      ".marquee-content",
    ) as unknown as HTMLElement[];

    if (!content1 || !content2) return;

    // Force widths so the measurement is reliable
    const width = content1.scrollWidth / 2;
    const duration = width / 60;

    // Position second block right after the first one
    gsap.set(content2, { x: width });

    gsap.set(root.current, { autoAlpha: 1 });

    // Animate the whole strip to the left
    gsap.fromTo(
      inner.current,
      {
        x: width,
      },
      {
        duration: duration,
        x: 0,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x: string) => {
            const n = -parseFloat(x);
            return (n % width) + "px";
          },
        },
      },
    );
  }, []);

  const MarqueeItem = () => (
    <div className="marquee-item linear-gradient-to-b flex shrink-0 items-center gap-2 from-transparent to-black px-4 py-2">
      <div className="flex h-4 w-4 items-center justify-center rounded-full">
        <img src="/homepage/dev.webp" alt="dev-connect" />
      </div>
      <span className="font-orbitron text-base font-medium whitespace-nowrap text-white md:text-xl">
        Season 0 Starts in:{" "}
        <span className="text-overgoal-blue">{daysUntilSeasonStart} days</span>
      </span>
    </div>
  );

  return (
    <div ref={root} className="w-full overflow-hidden opacity-0">
      <div ref={inner} className="flex">
        <div className="marquee-content flex shrink-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <MarqueeItem key={`a-${i}`} />
          ))}
        </div>
        <div className="marquee-content flex shrink-0">
          {Array.from({ length: 15 }).map((_, i) => (
            <MarqueeItem key={`b-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
