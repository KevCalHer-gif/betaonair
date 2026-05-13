@echo off
REM deploy.bat — Script de despliegue para Betaonair (Windows CMD)
REM Ejecutar desde la raíz del proyecto.

echo ==========================================
echo  Instalando dependencias...
echo ==========================================
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install falló.
    pause
    exit /b %errorlevel%
)

echo ==========================================
echo  Construyendo el proyecto...
echo ==========================================
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: npm run build falló.
    pause
    exit /b %errorlevel%
)

echo ==========================================
echo  Build completado exitosamente.
echo  Ejecute "npm run start" en producción.
echo ==========================================
pause
````
