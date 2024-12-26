#!/bin/bash

year=$1
day=$2

npx tsx $year/day$day/code.ts $year $day
