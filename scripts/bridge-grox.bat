@echo off
REM Puente entre la línea de comandos y GROX API
echo Conectando puente GROX...
if not defined GROX_API_KEY (
    echo ADVERTENCIA: Variable GROX_API_KEY no configurada.
    echo El script continuará en modo simulación.
)
echo Puente iniciado correctamente (solo emulación).
echo Para una conexión real, configura GROX_API_KEY en tu .env
pause
