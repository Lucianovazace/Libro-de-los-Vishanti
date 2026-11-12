@echo off
title Autotest de MIA
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0autotest.ps1" %*
echo.
echo El resultado quedo en autotest-resultado.txt
pause
