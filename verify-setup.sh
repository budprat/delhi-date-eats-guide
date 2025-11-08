#!/bin/bash

# Phase 1 Setup Verification Script
# Run this after completing manual Convex setup

echo "🔍 Delhi Date Eats - Phase 1 Setup Verification"
echo "================================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# Check 1: Node modules installed
echo -n "✓ Checking node_modules... "
if [ -d "node_modules" ] && [ -d "node_modules/convex" ] && [ -d "node_modules/better-auth" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAIL${NC}"
    echo "  Run: npm install"
    ERRORS=$((ERRORS + 1))
fi

# Check 2: Convex directory exists
echo -n "✓ Checking convex/ directory... "
if [ -d "convex" ] && [ -f "convex/schema.ts" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAIL${NC}"
    echo "  Convex files missing!"
    ERRORS=$((ERRORS + 1))
fi

# Check 3: Environment file exists
echo -n "✓ Checking .env.local... "
if [ -f ".env.local" ]; then
    echo -e "${GREEN}OK${NC}"

    # Check if VITE_CONVEX_URL is set
    if grep -q "VITE_CONVEX_URL=https://" .env.local; then
        echo -e "  ${GREEN}✓ VITE_CONVEX_URL is configured${NC}"
    else
        echo -e "  ${YELLOW}⚠ VITE_CONVEX_URL needs to be set${NC}"
        echo "    Add your Convex URL to .env.local"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${RED}FAIL${NC}"
    echo "  Create .env.local (see .env.example)"
    ERRORS=$((ERRORS + 1))
fi

# Check 4: Authentication pages exist
echo -n "✓ Checking auth pages... "
if [ -f "src/pages/Login.tsx" ] && [ -f "src/pages/Signup.tsx" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAIL${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check 5: Convex generated types
echo -n "✓ Checking Convex generated types... "
if [ -d "convex/_generated" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${YELLOW}PENDING${NC}"
    echo "  Run 'npm run convex:dev' to generate types"
    ERRORS=$((ERRORS + 1))
fi

# Check 6: TypeScript config
echo -n "✓ Checking TypeScript config... "
if [ -f "tsconfig.json" ] && [ -f "convex/tsconfig.json" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAIL${NC}"
    ERRORS=$((ERRORS + 1))
fi

echo ""
echo "================================================"

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: npm run convex:dev (in terminal 1)"
    echo "2. Run: npm run dev (in terminal 2)"
    echo "3. Visit: http://localhost:8080"
    echo ""
    echo "See CONVEX_SETUP_MANUAL.md for detailed instructions"
else
    echo -e "${RED}❌ Found $ERRORS issue(s)${NC}"
    echo ""
    echo "Please fix the issues above and run this script again"
    echo "See CONVEX_SETUP_MANUAL.md for help"
fi

echo ""
