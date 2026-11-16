@echo off
title Muestras de tiendas de libros y comics
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tiendas-libros-muestras.ps1"
echo.
echo Listo. Podes cerrar esta ventana.
pause
