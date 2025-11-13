"use client";

import { Button } from "../../../components/ui/button";
import { useStarknetConnect } from "../../../dojo/hooks/useStarknetConnect";
import { Wallet, LogOut, Loader2 } from "lucide-react";
import { useCreatePlayer } from "../../../dojo/hooks/useCreatePlayer";

export default function ConnectionTestScreen() {
  const { status, address, isConnecting, handleConnect, handleDisconnect } =
    useStarknetConnect();

  const { initializePlayer, resetInitializer, txStatus } = useCreatePlayer();

  const isConnected = status === "connected";

  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Cartridge Connection Test
        </h1>

        {/* Status Display */}
        <div className="mb-6 rounded-lg bg-slate-800/50 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-slate-400">Status:</span>
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
              <span className="text-sm text-slate-400">Address:</span>
              <span className="font-mono text-sm text-white">
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
              className="w-full bg-gradient-to-r from-red-500 to-red-600 px-6 py-6 text-lg font-semibold shadow-lg shadow-red-500/30 transition-all duration-300 hover:from-red-600 hover:to-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-5 w-5" />
                  Connect Controller
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleDisconnect}
              className="w-full bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-6 text-lg font-semibold shadow-lg shadow-slate-500/30 transition-all duration-300 hover:from-slate-700 hover:to-slate-800"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Disconnect
            </Button>
          )}
        </div>

        <div>
          <Button onClick={handleDisconnect}> Disconnect</Button>
        </div>

        <div>
          <Button onClick={() => initializePlayer()}>
            {" "}
            Create Player
          </Button>
        </div>
        <div> {txStatus} </div>

        <div>
          <Button onClick={() => resetInitializer()}> Reset Initializer</Button>
        </div>

        {/* Status Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div
            className={`h-3 w-3 animate-pulse rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span className="text-sm text-slate-300">
            {isConnected ? "Connected to Cartridge" : "Not connected"}
          </span>
        </div>
      </div>
    </div>
  );
}
