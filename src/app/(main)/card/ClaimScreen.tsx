import { useParams } from "react-router";
import ClaimScene from "../claim/ClaimScene";
import LoginButton from "../../../components/common/LoginButton";
import CyberContainer from "../Home/components/cyber-container";

const ClaimScreen = () => {
  const { id } = useParams();

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <img
        src="/backgrounds/bg-card.png"
        alt="background"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 top-[90%] left-1/2 z-100 flex h-1/4 w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-linear-to-b from-transparent to-black">
        <CyberContainer className="airstrike-normal flex h-20 w-[80%] items-center justify-center bg-transparent text-center text-5xl font-bold text-white">
          <LoginButton className="airstrike-normal flex text-5xl font-bold text-white hover:scale-105 hover:bg-transparent">
            <span className="airstrike-normal text-4xl">Claim</span>
          </LoginButton>
        </CyberContainer>
      </div>
      <ClaimScene playerLinkId={id || ""} />
    </div>
  );
};

export default ClaimScreen;
