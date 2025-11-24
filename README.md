<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Mudassir.ai - Intelligent Vision Portfolio 🚀

An AI-powered interactive portfolio website featuring Google's Gemini AI for intelligent conversations about experience, projects, and skills.

View your app in AI Studio: https://ai.studio/apps/drive/1UUAvbSuDEr-yuQtfGS41wTcE5pLANCSX

## ✨ Features

- 🤖 **AI-Powered Chat**: Interactive conversations powered by Google Gemini AI
- 📊 **Data Visualizations**: Beautiful D3.js visualizations
- ✨ **Smooth Animations**: Framer Motion powered animations
- 🎨 **Modern UI**: Clean and professional design
- 📱 **Responsive**: Works seamlessly on all devices

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 16 or higher) - [Download](https://nodejs.org/)
- **Gemini API Key** - [Get yours here](https://aistudio.google.com/app/apikey)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API Key:**
   
   Open `.env.local` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   Get your API key from: https://aistudio.google.com/app/apikey

3. **Run the app:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   
   Navigate to `http://localhost:3000`

## 📖 Documentation

For detailed setup instructions, troubleshooting, and more, see [SETUP.md](SETUP.md)

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## 🔧 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Google Gemini AI** - AI-powered conversations
- **D3.js** - Data visualizations
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📁 Project Structure

```
mudassirdev/
├── components/         # React components
├── services/          # API services
├── public/            # Static assets
├── constants.ts       # Portfolio data
├── App.tsx            # Main app component
├── index.tsx          # Entry point
└── vite.config.ts     # Vite configuration
```

## 🔐 Security

- Never commit `.env.local` to version control
- Keep your API key secret
- The `.env.local` file is already in `.gitignore`

## 📝 License

This project is private and proprietary.

---

Made with ❤️ by Syed Muhammad Mudassir
