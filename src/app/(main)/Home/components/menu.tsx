import MenuNav from "./menu-nav";
import MenuFooter from "./menu-footer";

type Props = {};

export default function HomeMenu({}: Props) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative  !z-100">
      <MenuNav />
      <MenuFooter />
    </div>
  );
}
