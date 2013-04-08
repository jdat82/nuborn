#!/bin/bash
echo "SCSS preprocessor with expanded style"

# this script is based on convention
# expected folder structure :
# - www
# --- build
# --- css
# ------ scss
# --- js

if [[ -z $WWW ]]
then
	export WWW="$(dirname $0)/../"
	echo "WWW: using $WWW"
fi	

# we assume that all shell scripts are in a build folder
cd $WWW/build

source env.sh

cd $WWW/css

sass --watch app.scss:app.min.css --style "expanded"
