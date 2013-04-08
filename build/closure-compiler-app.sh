#!/bin/bash
echo "building app.min.js"

cd $WWW/js

java -jar $CLOSURE_HOME/compiler.jar \
--charset UTF-8 \
--compilation_level $LEVEL \
$FORMATTING \
--js=itlabs.fmk/_common.js \
--js=itlabs.fmk/_status.js \
--js=itlabs.fmk/_errors.js \
--js=itlabs.fmk/_toolbox.js \
--js=itlabs.fmk/_wordings.js \
--js=itlabs.fmk/_responsiveimages.js \
--js=itlabs.fmk/_loader.js \
--js=itlabs.fmk/_loader-page.js \
--js=itlabs.fmk/_loader-ajax.js \
--js=itlabs.fmk/_loader-element.js \
--js=itlabs.fmk/_context.js \
--js=itlabs.fmk/_ajax.js \
--js=itlabs.fmk/_pagesmanager.js \
--js=itlabs.fmk/_pagehandler.js \
--js=itlabs.fmk/_urls.js \
--js=itlabs.fmk/_config.js \
--js=itlabs.fmk/_geolocation.js \
--js=app/_app.js \
--js=app/_urls.js \
--js=app/_wordings.js \
--js=app/_splashscreen.js \
--js=app/_menu.js \
--js=app/_home.js \
--js=app/_other.js \
--js_output_file=$APP_MIN_JS