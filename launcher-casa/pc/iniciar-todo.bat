@echo off
rem Arranca las tres partes de MIA (modelo, voz y cerebro), minimizadas.
rem Desactiva el "modo edicion rapida" de la consola: un clic dentro de la ventana pausaba el programa.
reg add "HKCU\Console" /v QuickEdit /t REG_DWORD /d 0 /f >nul 2>&1
cd /d "%~dp0"
start "MIA - modelo" /min cmd /k "%~dp0iniciar-mia.bat"
timeout /t 5 /nobreak >nul
start "MIA - voz" /min cmd /k "%~dp0iniciar-voz.bat"
start "MIA - cerebro" /min cmd /k "%~dp0iniciar-cerebro.bat"
