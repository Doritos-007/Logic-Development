@echo off
cd /d %~dp0
if not exist node_modules (
  echo Instalando dependencias...
  call npm install
  if errorlevel 1 pause & exit /b 1
)
call npm run build
if not exist android (
  call npm run android:add
)
call npx cap sync android
call npx cap open android
pause
