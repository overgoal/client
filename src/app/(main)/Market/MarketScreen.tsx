
import { Header } from "../../../components/header"; 
import { StatusBar } from "../../../components/status-bar";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

export default function MarketScreen() {
  const marketItems = [
    { id: 1, name: "Training Equipment", price: 100, description: "Improve training efficiency" },
    { id: 2, name: "Energy Drink", price: 50, description: "Restore stamina instantly" },
    { id: 3, name: "Skill Book", price: 200, description: "Learn new abilities" },
    { id: 4, name: "Premium Ball", price: 150, description: "Better performance in matches" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />
        <StatusBar />

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-white mb-6">Market</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketItems.map((item) => (
              <Card key={item.id} className="bg-slate-800/50 border-slate-700 p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                  <p className="text-slate-300">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 font-bold text-lg">{item.price} coins</span>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Buy Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

