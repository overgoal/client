import BoxContainer from "../../../../components/common/container";
import { SeasonTeam } from "./teams-list";

type SeasonTeamItemProps = SeasonTeam & {
  index: number;
  color?: "blue" | "purple";
};

const formatIndex = (index: number) => {
  return index < 10 ? `0${index}` : index;
};

export default function SeasonTeamItem({
  name,
  index,
  points,
  members,
  color = "blue",
  imageUrl,
}: SeasonTeamItemProps) {
  return (
    <BoxContainer
      color={color}
      isSingleSide={false}
      className="w-full h-[80px] flex items-center justify-start"
    >
      <BoxContainer
        color={color}
        isSingleSide={true}
        className="w-[50px] h-[50px] !z-100 flex items-center justify-center"
      >
        <span
          className="text-lg font-orbitron font-medium text-center "
          style={{
            color: color === "blue" ? "var(--color-overgoal-blue)" : "white",
          }}
        >
          {formatIndex(index)}
        </span>
      </BoxContainer>
      <div className="w-full h-full flex flex-row gap-4 items-center justify-between">
        <div className="flex flex-col gap-2 items-start justify-start">
          <span className="text-white text-sm font-orbitron font-medium ml-2">
            {name}
          </span>
          <span
            className="w-full h-[1px] "
            style={{
              backgroundColor:
                color === "blue"
                  ? "var(--color-overgoal-blue)"
                  : "var(--color-overgoal-purple)",
            }}
          ></span>
          <div className="flex flex-row gap-6 items-center justify-start ml-2">
            <div className="text-white text-xs font-orbitron  flex flex-row gap-2 items-center justify-center !font-light">
              <span className="text-white text-xs font-orbitron !font-medium">
                Points:
              </span>
              <span className="text-white text-xs font-orbitron !font-medium">
                {points}
              </span>
            </div>
            <span className="text-white text-xs font-orbitron !font-light flex flex-row gap-2 items-center justify-center">
              <span className="text-white text-xs font-orbitron !font-medium">
                Members:
              </span>
              <span className="text-white text-xs font-orbitron !font-medium">
                {members}
              </span>
            </span>
          </div>
        </div>
        <div className="w-[50px] h-[50px] flex items-center justify-center">
          <img src={imageUrl} alt={name} width={50} height={50} />
        </div>
      </div>
    </BoxContainer>
  );
}
