#!/bin/bash
echo "building externals.min.js"

cd $WWW/js

cordovaScript=""
if [[ $mode == "hybride" ]]
then
	cordovaScript="--js=$WWW/../cordova-2.4.0.js"
	echo "using cordova library '$cordovaScript'"
fi

java -jar $CLOSURE_HOME/compiler.jar \
--charset UTF-8 \
--compilation_level WHITESPACE_ONLY \
$cordovaScript \
--js=externals/jquery-1.9.1.min.js \
--js=externals/_mobileinit.js \
--js=externals/jquery.mobile-1.3.0.min.js \
--js=externals/_inheritance.js \
--js_output_file=$EXTERNALS_MIN_JS
# --js=externals/jquery.mobile.custom.min.js \