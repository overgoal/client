#!/bin/bash

# Script to create .env.local file for local development

cat > .env.local << 'ENVEOF'
# Local Development Configuration for Cartridge Controller
VITE_PUBLIC_DEPLOY_TYPE=localhost
VITE_PUBLIC_NODE_URL=http://127.0.0.1:5050
VITE_PUBLIC_TORII=http://127.0.0.1:8080/graphql
VITE_PUBLIC_MASTER_ADDRESS=0x127fd5f1fe78a71f8bcd1fec63e3fe2f0486b6ecd5c86a0466c3a21fa5cfcec
VITE_PUBLIC_MASTER_PRIVATE_KEY=0xc5b2fcab997346f3ea1c00b002ecf6f382c5f9c9659a3894eb783c5320f912
ENVEOF

echo "✅ Created .env.local file"
echo ""
echo "📝 Next steps:"
echo "1. Close all Chrome/Arc browser windows"
echo "2. Start Chrome with: open -a 'Google Chrome' --args --disable-features=BlockInsecurePrivateNetworkRequests"
echo "3. Start Katana in universe directory"
echo "4. Start Torii in universe directory"  
echo "5. Run 'npm run dev' in this directory"
echo ""
echo "🎮 Then navigate to your app and test the Cartridge login!"
