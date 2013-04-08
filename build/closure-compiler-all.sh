#!/bin/bash
# $1 => target : possible values : prod/debug : default is prod
# $2 => mode : possible values : hybride (phonegap) / webapp (hébergé sur un serveur web) : default is hybride

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

target=$1
if [[ $target != "prod" && $target != "debug" ]]
then 
	target="prod"
fi
echo "using target $target"

mode=$2
if [[ $mode != "hybride" && $mode != "webapp" ]]
then 
	mode="hybride"
fi
echo "using mode $mode"

# level="ADVANCED_OPTIMIZATIONS"
level="SIMPLE_OPTIMIZATIONS"
formatting=""

if [[ $target == debug ]]
then 
	level="WHITESPACE_ONLY"
	formatting="--formatting PRETTY_PRINT"
fi

export LEVEL=$level
echo "using compilation level $LEVEL"

export FORMATTING=$formatting
if [[ $formatting != "" ]]
then 
	echo "using $FORMATTING"
fi

if [[ $target == prod ]] || [[ $target == debug && ! -f $WWW/js/$EXTERNALS_MIN_JS ]]
then 
	# on ne recrée pas le fichier des externals à chaque fois en target debug, cela allonge le temps de build inutilement
	source closure-compiler-externals.sh
fi

cd $WWW/build

source closure-compiler-app.sh
