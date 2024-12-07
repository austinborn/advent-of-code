# Advent of Code Typescript Solutions

## One-Time Setup (MacOS only)
1. Install NPM and Typescript:
```
brew install npm typescript
```

2. Install Node Types:
```
npm install @types/node --save-dev
```

3. Set executable permissions on scripts in `scripts/` directory.

## Daily Setup

1. Create code for year and day:
```
./scripts/addDay.sh 2024 13
```

2. Run code:
```
./scripts/runDay.sh 2024 13
```
Note that the first time this runs for a given day, it will attempt to pull the input text files from [https://adventofcode.com/](https://adventofcode.com/). If it fails to pull the files correctly (especially `inputExample.txt`), you may need to paste this manually from the website.
