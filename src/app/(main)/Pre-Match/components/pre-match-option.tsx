import { cn } from "../../../../utils/utils";

const options = [
  {
    id: 1,
    title: "Option 1",
  },
  {
    id: 2,
    title: "Option 2",
  },
  {
    id: 3,
    title: "Option 3",
  },
];

type PrematchOptionProps = {
  title: string;
};

const PrematchOption = ({ title }: PrematchOptionProps) => {
  return (
    <div className="w-full h-full bg-transparent rounded-lg p-6 text-center pre-match-item-container">
      <h3 className="text-white text-lg font-bold">{title}</h3>
    </div>
  );
};

type PrematchOptionsProps = {
  className?: string;
};
export default function PrematchOptions({ className }: PrematchOptionsProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-col items-center justify-center gap-6 px-2 z-100 ",
        className
      )}
    >
      {options.map((option) => (
        <PrematchOption key={option.id} title={option.title} />
      ))}
    </div>
  );
}
