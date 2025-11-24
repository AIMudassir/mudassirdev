#!/bin/bash

# Mudassir.ai Portfolio - Quick Start Script
# This script helps you quickly set up and run the project

echo "================================================"
echo "  Mudassir.ai - Intelligent Vision Portfolio"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✓ Dependencies installed successfully"
    echo ""
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local file not found"
    echo "Creating .env.local template..."
    cat > .env.local << EOL
# Gemini API Key
# Get your API key from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_api_key_here
EOL
    echo "✓ Created .env.local file"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.local and add your Gemini API key"
    echo "   Get your API key from: https://aistudio.google.com/app/apikey"
    echo ""
fi

# Check if API key is configured
if grep -q "your_api_key_here" .env.local 2>/dev/null; then
    echo "⚠️  WARNING: Gemini API key is not configured!"
    echo "   The AI chat feature will not work until you configure it."
    echo "   Edit .env.local and replace 'your_api_key_here' with your actual API key."
    echo "   Get your API key from: https://aistudio.google.com/app/apikey"
    echo ""
fi

echo "🚀 Starting development server..."
echo ""
echo "The application will be available at:"
echo "  → Local:   http://localhost:3000"
echo "  → Network: http://0.0.0.0:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "================================================"
echo ""

npm run dev
