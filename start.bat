@echo off
REM Mudassir.ai Portfolio - Quick Start Script (Windows)
REM This script helps you quickly set up and run the project

echo ================================================
echo   Mudassir.ai - Intelligent Vision Portfolio
echo ================================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: npm is not installed.
    echo Please install npm (comes with Node.js) from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo npm version:
npm --version
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install dependencies
        pause
        exit /b 1
    )
    echo Dependencies installed successfully
    echo.
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo Warning: .env.local file not found
    echo Creating .env.local template...
    (
        echo # Gemini API Key
        echo # Get your API key from: https://aistudio.google.com/app/apikey
        echo GEMINI_API_KEY=your_api_key_here
    ) > .env.local
    echo Created .env.local file
    echo.
    echo IMPORTANT: Please edit .env.local and add your Gemini API key
    echo    Get your API key from: https://aistudio.google.com/app/apikey
    echo.
)

REM Check if API key is configured
findstr /C:"your_api_key_here" .env.local >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo WARNING: Gemini API key is not configured!
    echo    The AI chat feature will not work until you configure it.
    echo    Edit .env.local and replace 'your_api_key_here' with your actual API key.
    echo    Get your API key from: https://aistudio.google.com/app/apikey
    echo.
)

echo Starting development server...
echo.
echo The application will be available at:
echo   Local:   http://localhost:3000
echo   Network: http://0.0.0.0:3000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ================================================
echo.

call npm run dev
