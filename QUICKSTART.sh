#!/bin/bash

# Sitecore AI Troubleshooter - Quick Start Guide

echo "=========================================="
echo "  Sitecore AI Troubleshooter"
echo "  Quick Start Installation"
echo "=========================================="
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 16.8 or later"
    exit 1
else
    echo "✅ Node.js found: $(node --version)"
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install dependencies with retry logic
npm install --legacy-peer-deps || npm install --no-audit --no-fund

echo ""
echo "✅ Installation complete!"
echo ""
echo "=========================================="
echo "  Next Steps:"
echo "=========================================="
echo ""
echo "1. Start development server:"
echo "   npm run dev"
echo ""
echo "2. Open browser to:"
echo "   http://localhost:3000"
echo ""
echo "3. Build for production:"
echo "   npm run build"
echo "   npm start"
echo ""
echo "=========================================="
