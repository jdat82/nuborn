#!/bin/bash

if [[ "$1" == js ]]
then
	grunt uglify --profile=$2;
fi

if [[ "$1" == scss || "$1" == css ]]
then
	grunt sass --profile=$2;
fi

if [[ "$1" == html ]]
then
	grunt htmlmin --profile=$2;
fi