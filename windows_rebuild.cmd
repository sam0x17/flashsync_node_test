::rd /s /q node_modules
set npm_config_target=v1.4.15
:: The architecture of Electron, can be ia32 or x64.
set npm_config_arch=x64
set npm_config_target_arch=x64
:: Download headers for Electron.
::set npm_config_disturl=https://atom.io/download/electron
:: Tell node-pre-gyp that we are building for Electron.
::set npm_config_runtime=electron
:: Tell node-pre-gyp to build module from source code.
set npm_config_build_from_source=true
:: Install all dependencies, and store cache to ~/.electron-gyp.
call npm install
::call .\node_modules\.bin\electron-rebuild.cmd -f
