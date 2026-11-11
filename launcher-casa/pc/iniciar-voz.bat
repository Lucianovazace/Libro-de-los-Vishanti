@echo off
title Voz de MIA
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0voz-servidor.ps1"
pause
