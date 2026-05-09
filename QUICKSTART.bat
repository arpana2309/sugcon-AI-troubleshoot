@echo off
REM Sitecore AI Troubleshooter - Quick Start Guide (Windows)

echo.
echo ==========================================
echo   Sitecore AI Troubleshooter
echo   Quick Start Installation
echo ==========================================
echo.

REM Check if Node is installed
where node >nul 2>nul
if %ERRORLEVEL% GEQ 1 (
    echo X Node.js not found. Please install Node.js 16.8 or later
    exit /b 1
) else (
    echo . Node.js found: 
    node --version
)

echo.
echo . Installing dependencies...
echo.

REM Install dependencies
npm install --legacy-peer-deps
if %ERRORLEVEL% GEQ 1 (
    echo Retrying with alternative settings...
    npm install --no-audit --no-fund
)

echo.
echo . Installation complete!
echo.
echo ==========================================
echo   Next Steps:
echo ==========================================
echo.
echo 1. Start development server:
echo    npm run dev
echo.
echo 2. Open browser to:
echo    http://localhost:3000
echo.
echo 3. Build for production:
echo    npm run build
echo    npm start
echo.
echo ==========================================
echo.
pause
