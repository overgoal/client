#!/bin/bash

# Script to start Chrome with Private Network Access disabled
# This allows Cartridge Controller to connect to your local Katana instance

echo "🔧 Starting Chrome with development flags..."
echo ""
echo "⚠️  This disables a security feature - only use for development!"
echo ""

# Check if Chrome is running
if pgrep -x "Google Chrome" > /dev/null || pgrep -x "Arc" > /dev/null; then
    echo "⚠️  Chrome/Arc is currently running."
    echo "Please close all Chrome/Arc windows and run this script again."
    exit 1
fi

# Detect which browser to use
if [ -d "/Applications/Google Chrome.app" ]; then
    echo "✅ Found Google Chrome, starting..."
    open -a "Google Chrome" --args --disable-features=BlockInsecurePrivateNetworkRequests
elif [ -d "/Applications/Arc.app" ]; then
    echo "✅ Found Arc Browser, starting..."
    open -a Arc --args --disable-features=BlockInsecurePrivateNetworkRequests
else
    echo "❌ Neither Google Chrome nor Arc Browser found in /Applications/"
    echo "Please install Chrome or Arc, or start your browser manually with:"
    echo "  --disable-features=BlockInsecurePrivateNetworkRequests"
    exit 1
fi

echo ""
echo "🎉 Browser started with development flags!"
echo ""
echo "📝 Next: Start your development servers:"
echo "  1. Katana: cd ../universe && katana --config katana.toml"
echo "  2. Torii: cd ../universe && torii --world <address>"
echo "  3. Client: npm run dev"
