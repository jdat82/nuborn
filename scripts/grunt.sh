#!/bin/bash

if [[ "$2" == *src/* ]]
then
	grunt nuborn --extension=$1 --no-color;
fi

if [[ "$2" == *libs/Nuborn* ]]
then
	grunt nuborn --extension=$1 --libs=true --no-color;
fi
