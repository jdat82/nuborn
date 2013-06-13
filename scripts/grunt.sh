#!/bin/bash

if [[ "$1" == js ]]
then
	grunt uglify:$3 --profile=$2;
elif [[ "$1" == scss || "$1" == css ]]
then
	grunt sass:$3 --profile=$2;
elif [[ "$1" == html ]]
then
	grunt htmlmin:$3 --profile=$2;
else
	grunt $3 --profile=$2
fi