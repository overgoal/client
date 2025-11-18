import { BackButton } from "../../../components/ui/back-button";
import { GlitchText } from "../../../components/ui/glitch-text";
import CalendarList from "./components/calendar-list";

export default function CalendarScreen() {
  return (
    <div className="flex h-lvh w-full flex-col items-center justify-center gap-8 bg-[url('/backgrounds/glitch-bg.webp')] bg-cover bg-center">
      <BackButton to="/" className="absolute top-5 left-0" />

      <div className="flex h-full w-full flex-col items-center justify-center gap-0">
        <div className="flex h-1/3 w-full items-center justify-center bg-[url('/calendar/banner-calendar.webp')] bg-cover bg-center pt-12">
          <GlitchText className="text-2xl" text="Match Calendar" />
        </div>

        <CalendarList />
      </div>
    </div>
  );
}
