@echo off
REM Puente entre la línea de comandos y GROX API
echo.
echo Archivos .bat se encuentran en: %~dp0
echo.

REM Cargar variables desde .env si existe
if exist ..\.env (
    for /f "3DYVhoL9p14RhgDeeVJWjWig4Zp_4EEemtSoTw6YMN3dP458w" %%a in ("..\.env") do (
        set %%a
    )
)

echo Conectando puente GROX...
if not defined GROX_API_KEY (
    echo ADVERTENCIA: Variable GROX_API_KEY no configurada.
    echo El script continuará en modo simulación.
) else (
    echo Usando API Key: %GROX_API_KEY:~0,15%...
)
echo Puente iniciado correctamente.
pause
