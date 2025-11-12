#!/bin/bash

# Diagnostic script for "invalid signature" error

echo "═══════════════════════════════════════════════════════════════"
echo "🔍 Diagnosing 'Invalid Signature' Error"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check 1: Environment variables
echo "1️⃣  Checking .env.local configuration..."
if [ -f .env.local ]; then
    echo "✅ .env.local exists"
    DEPLOY_TYPE=$(grep VITE_PUBLIC_DEPLOY_TYPE .env.local | cut -d '=' -f2)
    RPC_URL=$(grep VITE_PUBLIC_NODE_URL .env.local | cut -d '=' -f2)
    echo "   Deploy type: $DEPLOY_TYPE"
    echo "   RPC URL: $RPC_URL"
else
    echo "❌ .env.local not found!"
fi
echo ""

# Check 2: Katana status
echo "2️⃣  Checking Katana connection..."
if curl -s http://127.0.0.1:5050 > /dev/null 2>&1; then
    echo "✅ Katana is running on port 5050"
else
    echo "❌ Katana is NOT running on port 5050"
    echo "   Start it with: cd ../universe && katana --config katana.toml"
fi
echo ""

# Check 3: Manifest configuration
echo "3️⃣  Checking manifest configuration..."
MANIFEST_FILE="src/config/manifest.ts"
if [ -f "$MANIFEST_FILE" ]; then
    echo "✅ manifest.ts exists"
    echo "   Localhost manifest:"
    grep "import localhost" "$MANIFEST_FILE"
else
    echo "❌ manifest.ts not found!"
fi
echo ""

# Check 4: World addresses
echo "4️⃣  Checking world addresses..."
UNIVERSE_MANIFEST="../universe/manifest_dev.json"
CLIENT_MANIFEST="src/config/manifest_universe_dev.json"

if [ -f "$UNIVERSE_MANIFEST" ]; then
    UNIVERSE_WORLD=$(cat "$UNIVERSE_MANIFEST" | grep -m 1 '"address"' | cut -d '"' -f4)
    UNIVERSE_SEED=$(cat "$UNIVERSE_MANIFEST" | grep '"seed"' | cut -d '"' -f4)
    echo "   Universe manifest (source):"
    echo "     World: $UNIVERSE_WORLD"
    echo "     Seed: $UNIVERSE_SEED"
fi

if [ -f "$CLIENT_MANIFEST" ]; then
    CLIENT_WORLD=$(cat "$CLIENT_MANIFEST" | grep -m 1 '"address"' | cut -d '"' -f4)
    CLIENT_SEED=$(cat "$CLIENT_MANIFEST" | grep '"seed"' | cut -d '"' -f4)
    echo "   Client manifest (used by app):"
    echo "     World: $CLIENT_WORLD"
    echo "     Seed: $CLIENT_SEED"
    
    if [ "$UNIVERSE_WORLD" = "$CLIENT_WORLD" ]; then
        echo "   ✅ World addresses MATCH"
    else
        echo "   ❌ World addresses DO NOT MATCH!"
        echo "      This could cause signature errors!"
    fi
fi
echo ""

# Check 5: Cartridge connector namespace
echo "5️⃣  Checking Cartridge connector..."
CONNECTOR_FILE="src/config/cartridgeConnector.tsx"
if [ -f "$CONNECTOR_FILE" ]; then
    NAMESPACE=$(grep 'namespace:' "$CONNECTOR_FILE" | cut -d '"' -f2)
    echo "   Namespace: $NAMESPACE"
    
    if [ "$NAMESPACE" = "$UNIVERSE_SEED" ]; then
        echo "   ✅ Namespace matches Universe seed"
    else
        echo "   ⚠️  Namespace ($NAMESPACE) != Universe seed ($UNIVERSE_SEED)"
    fi
fi
echo ""

# Check 6: main.tsx domain configuration
echo "6️⃣  Checking main.tsx domain configuration..."
MAIN_FILE="src/main.tsx"
if [ -f "$MAIN_FILE" ]; then
    if grep -q "getChainId()" "$MAIN_FILE"; then
        echo "   ✅ Using dynamic chainId (good!)"
    else
        echo "   ⚠️  ChainId might be hardcoded"
    fi
    
    DOMAIN_NAME=$(grep 'name:' "$MAIN_FILE" | grep -A 1 'domain:' | grep 'name:' | cut -d '"' -f2)
    echo "   Domain name: $DOMAIN_NAME"
fi
echo ""

# Summary
echo "═══════════════════════════════════════════════════════════════"
echo "📋 DIAGNOSIS SUMMARY"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Common causes of 'invalid signature' error:"
echo ""
echo "1. ❌ Manifest mismatch - client using wrong manifest"
echo "   Fix: Ensure manifest.ts imports manifest_universe_dev.json for localhost"
echo ""
echo "2. ❌ World address mismatch - deployed world != manifest world"
echo "   Fix: Copy universe/manifest_dev.json to client/src/config/manifest_universe_dev.json"
echo ""
echo "3. ❌ ChainId mismatch - hardcoded chainId != actual network"
echo "   Fix: Use dynamic chainId in main.tsx based on VITE_PUBLIC_DEPLOY_TYPE"
echo ""
echo "4. ❌ Stale deployment - Katana restarted but manifest not updated"
echo "   Fix: Run 'cd ../universe && sozo migrate' then copy new manifest"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "💡 RECOMMENDED FIX:"
echo ""
echo "   cd ../universe"
echo "   sozo migrate"
echo "   cp manifest_dev.json ../client/src/config/manifest_universe_dev.json"
echo "   cd ../client"
echo "   npm run dev"
echo ""


