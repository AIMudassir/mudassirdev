# Setup Guide - Mudassir.ai Portfolio

This guide will help you set up and run the Mudassir.ai Intelligent Vision Portfolio project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A **Gemini API Key** from Google AI Studio

## Step-by-Step Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/AIMudassir/mudassirdev.git
cd mudassirdev
```

### 2. Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

This will install:
- React 19.2.0
- Vite 6.2.0
- TypeScript 5.8.2
- Google Gemini AI SDK
- D3.js for visualizations
- Framer Motion for animations
- Lucide React for icons

### 3. Configure Environment Variables

#### Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key or use an existing one
4. Copy the API key

#### Set Up .env.local File

A `.env.local` file has been created in the project root. Open it and replace `your_api_key_here` with your actual Gemini API key:

```env
GEMINI_API_KEY=YOUR_ACTUAL_API_KEY_HERE
```

**Important Security Notes:**
- Never commit your `.env.local` file to version control (it's already in `.gitignore`)
- Keep your API key secret
- Don't share your API key publicly

### 4. Run the Development Server

Start the development server with:

```bash
npm run dev
```

The application will start on `http://localhost:3000`

You should see output similar to:
```
  VITE v6.2.0  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://0.0.0.0:3000/
```

### 5. Access the Application

Open your web browser and navigate to:
- Local: `http://localhost:3000`
- Network: `http://0.0.0.0:3000` (accessible from other devices on your network)

## Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in development mode with hot module replacement (HMR).
The page will reload when you make changes.

### `npm run build`
Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`
Locally preview the production build.
Run this after `npm run build` to test the production version.

## Project Structure

```
mudassirdev/
├── components/         # React components
├── services/          # API services (Gemini AI integration)
├── public/            # Static assets
├── constants.ts       # Portfolio data (experience, projects, skills, etc.)
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main app component
├── index.tsx          # Application entry point
├── index.html         # HTML template
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
├── package.json       # Dependencies and scripts
└── .env.local         # Environment variables (not tracked in git)
```

## Features

This portfolio website includes:
- 🤖 **AI-Powered Chat**: Interactive chat powered by Google's Gemini AI
- 📊 **Interactive Visualizations**: D3.js powered data visualizations
- ✨ **Smooth Animations**: Framer Motion for fluid UI animations
- 🎨 **Modern Design**: Clean, professional interface
- 📱 **Responsive**: Works on all device sizes

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can either:
- Stop the process using port 3000
- Or modify the port in `vite.config.ts`

### API Key Issues
If the chat feature doesn't work:
- Verify your API key is correct in `.env.local`
- Ensure there are no extra spaces in the key
- Check that the file is named `.env.local` (not `.env.local.txt`)
- Restart the dev server after changing the `.env.local` file

### Dependencies Not Installing
If `npm install` fails:
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again
- Ensure you're using a compatible Node.js version

## Getting Help

If you encounter any issues:
1. Check the console in your browser's developer tools
2. Check the terminal where the dev server is running
3. Ensure all prerequisites are met
4. Review this setup guide carefully

## Next Steps

After successfully running the project:
- Explore the interactive portfolio features
- Try the AI chat functionality
- View the projects and experience sections
- Customize the content in `constants.ts` for your own portfolio

Enjoy exploring the Mudassir.ai Intelligent Vision Portfolio! 🚀
