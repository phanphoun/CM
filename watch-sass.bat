@echo off
REM ===========================================
REM watch-sass.bat - SASS Watch Script
REM ===========================================
REM This script watches all SASS files and
REM automatically compiles them to CSS
REM ===========================================

echo.
echo ==========================================
echo    SASS Watch Mode
echo ==========================================
echo.
echo Watching SASS files for changes...
echo Press Ctrl+C to stop watching
echo.

REM Check if SASS is installed
sass --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: SASS is not installed or not in PATH
    echo Please install SASS: npm install -g sass
    echo.
    pause
    exit /b 1
)

REM Create css directory if it doesn't exist
if not exist "css" mkdir css

REM Start watching all SASS files
echo Starting watch mode for all SASS files...
echo.

REM Watch main stylesheet
start "SASS Watch - main" cmd /k sass sass/main.scss css/style.css --watch --style compressed

REM Watch grade-specific stylesheets
start "SASS Watch - grade7" cmd /k sass sass/pages/grade7.scss css/grade7.css --watch --style compressed
start "SASS Watch - grade8" cmd /k sass sass/pages/grade8.scss css/grade8.css --watch --style compressed
start "SASS Watch - grade9" cmd /k sass sass/pages/grade9.scss css/grade9.css --watch --style compressed
start "SASS Watch - grade10" cmd /k sass sass/pages/grade10.scss css/grade10.css --watch --style compressed
start "SASS Watch - grade11" cmd /k sass sass/pages/grade11.scss css/grade11.css --watch --style compressed
start "SASS Watch - grade12" cmd /k sass sass/pages/grade12.scss css/grade12.css --watch --style compressed

echo.
echo All SASS files are now being watched.
echo Separate windows have been opened for each file.
echo Close the windows to stop watching.
echo.
echo Watching:
echo - sass/main.scss -> css/style.css
echo - sass/pages/grade7.scss -> css/grade7.css
echo - sass/pages/grade8.scss -> css/grade8.css
echo - sass/pages/grade9.scss -> css/grade9.css
echo - sass/pages/grade10.scss -> css/grade10.css
echo - sass/pages/grade11.scss -> css/grade11.css
echo - sass/pages/grade12.scss -> css/grade12.css
echo.

pause
