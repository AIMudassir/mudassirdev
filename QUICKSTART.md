# 🚀 Quick Start Guide

Get up and running in 3 minutes!

## Method 1: Using the Start Script (Recommended) ⚡

### On Mac/Linux:
```bash
./start.sh
```

### On Windows:
```batch
start.bat
```

The script will automatically:
- ✓ Check if Node.js is installed
- ✓ Install dependencies if needed
- ✓ Create .env.local if it doesn't exist
- ✓ Warn you if API key is not configured
- ✓ Start the development server

## Method 2: Manual Setup 🔧

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure API Key
1. Open `.env.local`
2. Get your API key from: https://aistudio.google.com/app/apikey
3. Replace `your_api_key_here` with your actual key:
   ```
   GEMINI_API_KEY=AIza...your_actual_key_here
   ```

### Step 3: Run the App
```bash
npm run dev
```

### Step 4: Open Browser
Navigate to: **http://localhost:3000**

## That's It! 🎉

You should now see the Mudassir.ai portfolio running in your browser.

## Troubleshooting

### "Node.js not found"
Install Node.js from: https://nodejs.org/

### "Port 3000 already in use"
Kill the process using port 3000 or change the port in `vite.config.ts`

### "AI Chat not working"
Make sure you've added your Gemini API key to `.env.local`

## Next Steps

- 📖 Read the full [SETUP.md](SETUP.md) for detailed information
- 🎨 Explore the interactive portfolio features
- 🤖 Try the AI chat functionality
- 📊 View the visualizations

## Need Help?

- Check [SETUP.md](SETUP.md) for detailed setup instructions
- Review the [README.md](README.md) for project overview
- Check your browser console for errors (F12)
- Check the terminal for server errors

---

Happy coding! 💻✨
