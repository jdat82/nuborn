#!/bin/bash

if [[ "$2" == *src/* ]]
then
	grunt nuborn --extension=$1 --scope=app --no-color;
fi

if [[ "$2" == *libs/Nuborn* ]]
then
	grunt nuborn --extension=$1 --scope=libs --no-color;
fi
