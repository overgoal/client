import { Button } from "../../components/ui/button";
import { socialLinks } from "./Home/constants";
import { Link } from "react-router";
import { GlitchText } from "../../components/ui/glitch-text";

const discordIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32px"
    height="32px"
    viewBox="0 0 32 32"
  >
    <g className="nc-icon-wrapper" fill="rgba(255, 255, 255, 1)">
      <path d="M26.413,6.536c-1.971-.902-4.052-1.543-6.189-1.904-.292,.523-.557,1.061-.793,1.612-2.277-.343-4.592-.343-6.869,0-.236-.551-.5-1.089-.793-1.612-2.139,.365-4.221,1.006-6.194,1.909C1.658,12.336,.596,17.987,1.127,23.558h0c2.294,1.695,4.861,2.984,7.591,3.811,.615-.827,1.158-1.704,1.626-2.622-.888-.332-1.744-.741-2.56-1.222,.215-.156,.425-.316,.628-.472,4.806,2.26,10.37,2.26,15.177,0,.205,.168,.415,.328,.628,.472-.817,.483-1.676,.892-2.565,1.225,.467,.918,1.011,1.794,1.626,2.619,2.732-.824,5.301-2.112,7.596-3.808h0c.623-6.461-1.064-12.06-4.46-17.025Zm-15.396,13.596c-1.479,0-2.702-1.343-2.702-2.994s1.18-3.006,2.697-3.006,2.73,1.354,2.704,3.006-1.192,2.994-2.699,2.994Zm9.967,0c-1.482,0-2.699-1.343-2.699-2.994s1.18-3.006,2.699-3.006,2.723,1.354,2.697,3.006-1.189,2.994-2.697,2.994Z"></path>
    </g>
  </svg>
);

const TwitterIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32px"
    height="32px"
    viewBox="0 0 32 32"
  >
    <g className="nc-icon-wrapper" fill="rgba(255, 255, 255, 1)">
      <path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"></path>
    </g>
  </svg>
);

export default function PostLoginScreen() {
  return (
    <div className="relative flex h-lvh w-full flex-col items-center justify-center gap-8 bg-[url('/login/background.webp')] bg-cover bg-center">
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-black/50 px-4">
        <div className="flex flex-col items-center justify-center gap-6">
          <GlitchText
            text="Claim Your Legend!"
            className="text-center text-2xl"
          />
          <h3 className="font-orbitron max-w-2xl text-center text-xl leading-tight font-bold text-white uppercase">
            Join our <span className="text-overgoal-blue">Discord</span> or{" "}
            <span className="text-overgoal-blue">Twitter</span> to get your{" "}
            <span className="text-overgoal-blue underline underline-offset-2">
              unique player card
            </span>
          </h3>
        </div>

        <div className="flex flex-row items-center justify-center gap-4">
          {socialLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              {link.iconName === "twitter" ? TwitterIcon : discordIcon}
            </Link>
          ))}
        </div>

        <Link to="/">
          <Button
            variant="outline"
            className="bg-overgoal-dark-blue/90 text-white"
          >
            <span className="font-orbitron text-base font-bold text-white uppercase">
              Continue
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
