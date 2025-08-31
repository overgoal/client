import { Header } from "../../../components/header";
import { GameSection } from "../../../components/game-section";
import { LinksSection } from "../../../components/links-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        <GameSection />
        <LinksSection />
      </div>
    </div>
  );
}

