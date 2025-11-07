import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../utils/utils";
import { getIcon } from "../../../../utils/utils";
import { Link } from "react-router";

type Props = {
  icon: string;
  title: string;
  href: string;
};

export const LifestylesButton = ({ icon, title, href }: Props) => {
  return (
    <div
      className={cn(
        "max-w-[85px] max-h-[97px] w-full h-full flex flex-col gap-1 items-center justify-center p-2",
        "lifestyle-container",
        "ml-auto"
      )}
    >
      <Link to={href}>
        <Button className="lifestyle-inner-container w-full h-full p-4 flex flex-col gap-2 items-center  justify-center">
          <div className="flex flex-col gap-2 items-center justify-center -rotate-10">
            <img
              src={getIcon(icon)}
              alt={title}
              className="w-10  h-10 -rotate-2"
            />
            <p className="text-white uppercase orbitron-medium text-[8px]">
              {title}
            </p>
          </div>
        </Button>
      </Link>
    </div>
  );
};
``;
