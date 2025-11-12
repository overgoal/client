#!/bin/bash

# Script to switch from localhost to Sepolia testnet
# This avoids CORS issues entirely - no Chrome flags needed!

echo "🔄 Switching to Sepolia testnet configuration..."
echo ""

# Backup current .env.local
if [ -f .env.local ]; then
    cp .env.local .env.local.backup
    echo "✅ Backed up current .env.local to .env.local.backup"
fi

# Create new .env.local for Sepolia
cat > .env.local << 'EOF'
# Sepolia Testnet Configuration
# No CORS issues - works with regular Chrome!

VITE_PUBLIC_DEPLOY_TYPE=sepolia
VITE_PUBLIC_NODE_URL=https://api.cartridge.gg/x/starknet/sepolia
VITE_PUBLIC_TORII=http://127.0.0.1:8080/graphql

# Master account (Katana default - for local testing only)
VITE_PUBLIC_MASTER_ADDRESS=0x127fd5f1fe78a71f8bcd1fec63e3fe2f0486b6ecd5c86a0466c3a21fa5cfcec
VITE_PUBLIC_MASTER_PRIVATE_KEY=0xc5b2fcab997346f3ea1c00b002ecf6f382c5f9c9659a3894eb783c5320f912
EOF

echo "✅ Created new .env.local for Sepolia"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Deploy your Universe contracts to Sepolia:"
echo "   cd ../universe"
echo "   sozo migrate --profile sepolia"
echo ""
echo "2. Update client manifest with Sepolia deployment:"
echo "   Copy universe/manifest_sepolia.json to client/src/config/manifest.json"
echo ""
echo "3. Start Torii pointing to Sepolia:"
echo "   cd ../universe"
echo "   torii --world <sepolia-world-address> --rpc https://api.cartridge.gg/x/starknet/sepolia"
echo ""
echo "4. Start your client:"
echo "   npm run dev"
echo ""
echo "5. Test Cartridge login (no Chrome flags needed! 🎉)"
echo ""
echo "💡 To switch back to localhost, run: cp .env.local.backup .env.local"
echo ""

