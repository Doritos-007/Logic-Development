@echo off
cd /d %~dp0
if not exist node_modules (
  echo Instalando dependencias...
  call npm install
  if errorlevel 1 (
    echo.
    echo Ocurrio un error al instalar las dependencias.
    pause
    exit /b 1
  )
)
echo Iniciando Cafe Cuauhtemoc en http://localhost:8100 ...
call npm start
pause
