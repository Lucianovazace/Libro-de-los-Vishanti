@echo off
cd /d "%~dp0"
start "MIA - modelo" cmd /k "%~dp0iniciar-mia.bat"
start "MIA - voz" cmd /k "%~dp0iniciar-voz.bat"
start "MIA - cerebro" cmd /k "%~dp0iniciar-cerebro.bat"
