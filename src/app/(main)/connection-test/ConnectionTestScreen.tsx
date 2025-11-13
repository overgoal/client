"use client";

import { Button } from "../../../components/ui/button";
import { useStarknetConnect } from "../../../dojo/hooks/useStarknetConnect";
import { Wallet, LogOut, Loader2 } from "lucide-react";
import { useCreatePlayer } from "../../../dojo/hooks/useCreatePlayer";

export default function ConnectionTestScreen() {
  const {
    status,
    address,
    isConnecting,
    handleConnect,
    handleDisconnect,
  } = useStarknetConnect();

  const { initializePlayer, resetInitializer, txStatus     } = useCreatePlayer();

  const isConnected = status === "connected";

  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Cartridge Connection Test
        </h1>

        {/* Status Display */}
        <div className="mb-6 p-4 bg-slate-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Status:</span>
            <span
              className={`font-semibold ${
                isConnected ? "text-green-400" : "text-red-400"
              }`}
            >
              {status}
            </span>
          </div>

          {address && (
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Address:</span>
              <span className="text-white font-mono text-sm">
                {formatAddress(address)}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {!isConnected ? (
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full px-6 py-6 text-lg font-semibold transition-all duration-300 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="w-5 h-5 mr-2" />
                  Connect Controller
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleDisconnect}
              className="w-full px-6 py-6 text-lg font-semibold transition-all duration-300 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 shadow-lg shadow-slate-500/30"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Disconnect
            </Button>
          )}
        </div>

        <div>
            <Button onClick={handleDisconnect}>    Disconnect</Button>
        </div>

        <div>
            <Button onClick={() => initializePlayer("player1")}>    Create Player</Button>
        </div>
        <div
        >   {txStatus} </div>

        <div>
            <Button onClick={() => resetInitializer()}>    Reset Initializer</Button>
        </div>

        {/* Status Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div
            className={`w-3 h-3 rounded-full animate-pulse ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span className="text-slate-300 text-sm">
            {isConnected ? "Connected to Cartridge" : "Not connected"}
          </span>
        </div>
      </div>
    </div>
  );
}

