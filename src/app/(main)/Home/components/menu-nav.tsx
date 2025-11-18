import { SettingsIcon } from "lucide-react";
import CyberContainer from "./cyber-container";
import { Button } from "../../../../components/ui/button";
import { HomeMenuItem } from "../../../../components/ui/lifestyle-container";
import RivalMarquee from "./rival-marquee";
import { Link } from "react-router";
import { useAccount } from "@starknet-react/core";
import { useState } from "react";
import { useEffect } from "react";
import { lookupAddresses } from "@cartridge/controller";

export default function MenuNav() {
  const { account } = useAccount();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (account) {
      lookupAddresses([account.address]).then((username) => {
        setUsername(username.get(account.address) || null);
      });
    }
  }, [account]);
  return (
    <div className="mt-2 flex h-full max-h-1/4 w-full flex-col items-start justify-start">
      <div className="flex w-full flex-col gap-4 p-2">
        <div className="flex w-full flex-row items-center justify-start gap-2 p-2">
          <div className="h-[75px] w-[75px] flex-shrink-0">
            <div className="relative h-full w-full bg-[url('/homepage/profile_container.svg')] bg-contain bg-center bg-no-repeat">
              <img
                loading="lazy"
                src="/logo.png"
                alt="profile_container"
                className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 object-contain"
              />
            </div>
          </div>

          <div className="flex h-full w-full items-center justify-between gap-3">
            <div className="flex w-full flex-col gap-2">
              <CyberContainer className="flex h-1/3! w-3/4! flex-row items-center justify-center">
                <span className="font-orbitron text-overgoal-cyan text-sm font-medium">
                  {username}
                </span>
              </CyberContainer>
              <CyberContainer className="flex h-1/3! w-2/4! flex-row items-center justify-around pr-2">
                <img src="/icons/Coins.webp" alt="coins" className="h-4 w-4" />
                <h2 className="font-orbitron text-sm font-medium text-white">
                  5000
                </h2>
              </CyberContainer>
            </div>
            <div className="z-100 flex h-1/2 w-1/5 items-center justify-center bg-[url('/homepage/button_settings.svg')] bg-contain bg-center bg-no-repeat">
              <Link to="/settings" className="h-full w-full">
                <Button className="h-full w-full" asChild>
                  <SettingsIcon className="h-10 w-10 text-white opacity-100" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full bg-[url('/homepage/marquee-container.png')] bg-contain bg-center">
          <RivalMarquee />
        </div>
        {/* <LifestylesButton icon="LifeStyle" title="Lifestyle" href="/lifestyle" /> */}
        <div className="flex h-full w-full flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <HomeMenuItem
              borderColor="var(--color-overgoal-orange)"
              backgroundColor="#3d0d00"
              position="right"
              href="/tournaments"
              icon="Tournament"
              title="Tournament"
            />

            <HomeMenuItem
              borderColor="var(--color-overgoal-purple)"
              backgroundColor="#180027"
              position="right"
              href="/career"
              icon="Career"
              title="Career"
              size="small"
            />
          </div>

          {/* left side */}
          <div className="flex flex-col gap-2">
            <HomeMenuItem
              borderColor="var(--color-overgoal-light-blue)"
              backgroundColor="#001f2a"
              position="left"
              href="/lifestyle"
              icon="LifeStyle"
              title="Lifestyle"
            />

            <HomeMenuItem
              borderColor="var(--color-overgoal-purple)"
              backgroundColor="#180027"
              position="left"
              href="/calendar"
              icon="Calendar"
              title="Calendar"
              size="small"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
