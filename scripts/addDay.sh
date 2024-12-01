#!/bin/bash

year=$1
day=$2

mkdir ./$year/day$day

cp -r ./$year/template/ ./$year/day$day/
