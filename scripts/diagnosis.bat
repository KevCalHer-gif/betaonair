@echo off
echo.
echo ==========================================
echo  Diagnóstico admin en blanco — Paso 1
echo  npx payload generate:importmap
echo ==========================================
call npx payload generate:importmap
if %errorlevel% neq 0 (
    echo ERROR en paso 1. Copiar el mensaje exacto de arriba y escalar a LISANDRO.
    pause
    exit /b %errorlevel%
)
echo Import map generated successfully.
echo.
echo ==========================================
echo  Diagnóstico admin en blanco — Paso 2
echo  npx payload generate:types
echo ==========================================
call npx payload generate:types
if %errorlevel% neq 0 (
    echo ERROR en paso 2. Copiar el mensaje exacto de arriba y escalar a LISANDRO.
    pause
    exit /b %errorlevel%
)
echo Tipos generados sin errores.
echo.
echo ==========================================
echo  Diagnóstico admin en blanco — Paso 3
echo  npm run dev
echo ==========================================
echo Presione Ctrl+C para detener el servidor cuando haya verificado.
call npm run dev
pause
