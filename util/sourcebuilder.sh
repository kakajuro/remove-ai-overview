#!/bin/sh

# Get version from manifest file
version=$(cat ../manifests/chrome.manifest.json | grep version | grep -v manifest | tr -d '"' | tr -d ',' | tr -d ':' | tr -d " " | sed -E "s/^[a-zA-z:]*//")


# Remove previous data if any
echo Setting up...
rm -rf raosource *.zip
mkdir raosource

cd ..

# In root directory, copy all needed files
echo Copying files...
cp -r manifests util/raosource
cp -r public util/raosource
cp -r src util/raosource
cp util/sourceinfo.md util/raosource && cd util/raosource && mv sourceinfo.md README.md && cd ../..
cp $(ls -pa | grep -v / | grep -v md | grep -v txt) util/raosource # Copies all files I want from root dir (all files except md and txt files)

# Zip the source
echo Zipping...
cd util
tar.exe acf raosource_v$version.zip -C raosource .
echo Complete.
