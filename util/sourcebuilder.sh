#!/bin/sh

if [[ $# -eq 0 ]] ; then
    echo Provide a version number e.g. 1.0.0
    exit 1
fi


# Remove previous data if any
echo Setting up...
rm -rf raosource raosource.zip
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
tar.exe acf raosource_v"$1".zip -C raosource .
echo Complete.
