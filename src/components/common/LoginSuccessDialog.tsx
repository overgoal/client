import { X, CheckCircle, Copy, User, Wallet } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import CyberContainer from "../../app/(main)/Home/components/cyber-container";

interface LoginSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  username: string;
}

/**
 * LoginSuccessDialog - Popup showing successful login with address and username
 * 
 * Displays:
 * - Success message
 * - Connected wallet address (with copy button)
 * - Username from Cartridge Controller
 */
export default function LoginSuccessDialog({
  isOpen,
  onClose,
  address,
  username,
}: LoginSuccessDialogProps) {
  const [copied, setCopied] = useState(false);

  // Handle copy address to clipboard
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed left-1/2 top-1/2 z-[9999] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2">
        <CyberContainer className="relative bg-black/90 p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Content */}
          <div className="space-y-6">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="rounded-full bg-green-500/20 p-3">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center">
              <h2 className="airstrike-normal text-3xl font-bold text-white">
                Login Correct
              </h2>
              <p className="mt-2 text-sm text-white/60">
                Successfully connected to Cartridge Controller
              </p>
            </div>

            {/* Address Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/70">
                <Wallet className="h-4 w-4" />
                <span className="text-sm font-semibold">Address:</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/5 p-3">
                <code className="flex-1 overflow-hidden text-ellipsis text-xs text-white">
                  {address}
                </code>
                <button
                  onClick={handleCopyAddress}
                  className="rounded p-1.5 transition-colors hover:bg-white/10"
                  aria-label="Copy address"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-white/70" />
                  )}
                </button>
              </div>
            </div>

            {/* Username Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/70">
                <User className="h-4 w-4" />
                <span className="text-sm font-semibold">Username:</span>
              </div>
              <div className="rounded-lg bg-white/5 p-3">
                <p className="text-center text-lg font-bold text-white">
                  {username}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <Button
                onClick={onClose}
                className="airstrike-normal w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-6 text-xl font-bold text-white hover:from-cyan-600 hover:to-blue-600"
                size="lg"
              >
                Continue
              </Button>
            </div>
          </div>
        </CyberContainer>
      </div>
    </>
  );
}

