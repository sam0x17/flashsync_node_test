rm -rf node_modules
mkdir node_modules
mkdir node_modules\fuse-bindings
call npm install
cp "C:\Program Files (x86)\WinFsp\bin\winfsp-x64.dll" "node_modules\fuse-bindings\build\Release\winfsp-x64.dll"
