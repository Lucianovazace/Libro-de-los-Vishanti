@echo off
title Cerebro de MIA
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0cerebro.ps1"
pause
