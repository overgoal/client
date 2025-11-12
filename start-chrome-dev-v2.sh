#!/bin/bash

# Enhanced script to start Chrome with Private Network Access disabled
# This version forcefully kills existing Chrome instances first

echo "🔧 Starting Chrome with development flags..."
echo ""

# Function to kill Chrome/Arc processes
kill_browsers() {
    echo "🛑 Killing existing Chrome/Arc processes..."
    
    # Kill Chrome
    pkill -9 "Google Chrome" 2>/dev/null
    pkill -9 "Chrome" 2>/dev/null
    
    # Kill Arc
    pkill -9 "Arc" 2>/dev/null
    
    # Wait a moment for processes to die
    sleep 2
    
    echo "✅ Browser processes killed"
}

# Kill existing browsers
kill_browsers

echo ""
echo "⚠️  This disables a security feature - only use for development!"
echo ""

# Detect which browser to use
if [ -d "/Applications/Google Chrome.app" ]; then
    echo "✅ Starting Google Chrome with dev flags..."
    open -a "Google Chrome" --args \
        --disable-features=BlockInsecurePrivateNetworkRequests \
        --disable-web-security \
        --user-data-dir=/tmp/chrome-dev-profile
    
elif [ -d "/Applications/Arc.app" ]; then
    echo "✅ Starting Arc Browser with dev flags..."
    open -a Arc --args \
        --disable-features=BlockInsecurePrivateNetworkRequests \
        --disable-web-security \
        --user-data-dir=/tmp/arc-dev-profile
    
else
    echo "❌ Neither Google Chrome nor Arc Browser found"
    exit 1
fi

echo ""
echo "🎉 Browser started with development flags!"
echo ""
echo "⚠️  IMPORTANT: The browser is using a temporary profile."
echo "    You may need to log in to Cartridge Controller again."
echo ""
echo "📝 Next steps:"
echo "  1. Navigate to http://localhost:5173"
echo "  2. Go to claim screen"
echo "  3. Click 'Claim' to test Cartridge login"
echo ""

