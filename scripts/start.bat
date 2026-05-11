@echo off
REM Cambiar al directorio raíz del proyecto
cd /d "%~dp0.."
REM script para iniciar el entorno de desarrollo
echo Verificando configuración...

if not exist .env (
    echo ERROR: No se encontró el archivo .env.
    echo Copia .env.example a .env y configura las variables.
    pause
    exit /b 1
)

if not exist node_modules (
    echo Instalando dependencias...
    call npm install
    if errorlevel 1 (
        echo ERROR: Falló npm install.
        pause
        exit /b 1
    )
)

echo Iniciando servidor de desarrollo...
call npm run dev
pause
