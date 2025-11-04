import MenuNav from "./menu-nav";
import MenuFooter from "./menu-footer";

export default function HomeMenu() {
  return (  
    <div className="w-full h-full flex flex-col items-center justify-center relative  !z-100">
      <MenuNav />
      <MenuFooter />
    </div>
  );
}
