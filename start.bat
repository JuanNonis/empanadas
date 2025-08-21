@echo off
echo Iniciando Pizzas y Empanadas...
echo.
echo Instalando dependencias...
npm install
echo.
echo Iniciando servidor...
start http://localhost:3000
node index.js
pause
