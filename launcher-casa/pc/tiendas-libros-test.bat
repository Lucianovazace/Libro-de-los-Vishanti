@echo off
title Diagnostico de tiendas de libros y comics
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tiendas-libros-test.ps1"
echo.
echo Listo. Podes cerrar esta ventana.
pause
