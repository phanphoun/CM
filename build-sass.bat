@echo off
REM ===========================================
REM build-sass.bat - SASS Compilation Script
REM ===========================================
REM This script compiles all SASS files to CSS
REM for the Khmer Math Educational Website
REM ===========================================

echo.
echo ==========================================
echo    SASS Compilation Script
echo ==========================================
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

echo Compiling SASS files...
echo.

REM Compile main stylesheet
echo [1/7] Compiling main.scss to style.css...
sass sass/main.scss css/style.css --style compressed --no-source-map
if %errorlevel% neq 0 (
    echo ERROR: Failed to compile main.scss
    pause
    exit /b 1
)
echo ✓ main.scss compiled successfully

REM Compile grade-specific stylesheets
echo [2/7] Compiling grade7.scss to css/grade7.css...
sass sass/pages/grade7.scss css/grade7.css --style compressed --no-source-map
if %errorlevel% neq 0 (
    echo ERROR: Failed to compile grade7.scss
    pause
    exit /b 1
)
echo ✓ grade7.scss compiled successfully

echo [3/7] Compiling grade8.scss to css/grade8.css...
sass sass/pages/grade8.scss css/grade8.css --style compressed --no-source-map
if %errorlevel% neq 0 (
    echo ERROR: Failed to compile grade8.scss
    pause
    exit /b 1
)
echo ✓ grade8.scss compiled successfully

echo [4/7] Compiling grade9.scss to css/grade9.css...
sass sass/pages/grade9.scss css/grade9.css --style compressed --no-source-map
if %errorlevel% neq 0 (
    echo ERROR: Failed to compile grade9.scss
    pause
    exit /b 1
)
echo ✓ grade9.scss compiled successfully

echo [5/7] Compiling grade10.scss to css/grade10.css...
sass sass/pages/grade10.scss css/grade10.css --style compressed --no-source-map
if %errorlevel% neq 0 (
    echo ERROR: Failed to compile grade10.scss
    pause
    exit /b 1
)
echo ✓ grade10.scss compiled successfully

echo [6/7] Compiling grade11.scss to css/grade11.css...
sass sass/pages/grade11.scss css/grade11.css --style compressed --no-source-map
if %errorlevel% neq 0 (
    echo ERROR: Failed to compile grade11.scss
    pause
    exit /b 1
)
echo ✓ grade11.scss compiled successfully

echo [7/7] Compiling grade12.scss to css/grade12.css...
sass sass/pages/grade12.scss css/grade12.css --style compressed --no-source-map
if %errorlevel% neq 0 (
    echo ERROR: Failed to compile grade12.scss
    pause
    exit /b 1
)
echo ✓ grade12.scss compiled successfully

echo.
echo ==========================================
echo    Compilation Complete!
echo ==========================================
echo.
echo Generated files:
echo - css/style.css
echo - css/grade7.css
echo - css/grade8.css
echo - css/grade9.css
echo - css/grade10.css
echo - css/grade11.css
echo - css/grade12.css
echo.
echo All files compiled with compressed output.
echo.

REM Display file sizes
echo File sizes:
for %%f in (
    "css/style.css"
    "css/grade7.css"
    "css/grade8.css"
    "css/grade9.css"
    "css/grade10.css"
    "css/grade11.css"
    "css/grade12.css"
) do (
    if exist %%f (
        for %%F in (%%f) do (
            echo - %%~nxF: %%~zF bytes
        )
    )
)

echo.
pause
