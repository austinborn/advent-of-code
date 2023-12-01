
import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { getSum, getMaxes } from '../../utils'

const opponentPlayMap = {
  "A": "R",
  "B": "P",
  "C": "S"
}

const mePlayMap = {
  "X": "R",
  "Y": "P",
  "Z": "S"
}

// Opponent, then Me
const outcome = {
  "R": {
    "R": 3,
    "P": 6,
    "S": 0
  },
  "P": {
    "R": 0,
    "P": 3,
    "S": 6
  },
  "S": {
    "R": 6,
    "P": 0,
    "S": 3
  }
}

const myScore = {
  "R": 1,
  "P": 2,
  "S": 3
}

const round2MyScore = {
  "R": {
    "X": 3,
    "Y": 1,
    "Z": 2
  },
  "P": {
    "X": 1,
    "Y": 2,
    "Z": 3
  },
  "S": {
    "X": 2,
    "Y": 3,
    "Z": 1
  }
}

const round2Outcome = {
  "X": 0,
  "Y": 3,
  "Z": 6
}

const getScore = (opponentPlay, mePlay) => {
  return outcome[opponentPlay][mePlay] + myScore[mePlay]
}

const getScore2 = (round: string) => {
  const roundSplit = round.split(' ')

  return round2MyScore[opponentPlayMap[roundSplit[0]]][roundSplit[1]] + round2Outcome[roundSplit[1]]
}

const main = async () => {
  console.log("Solving Puzzle:")
  const input = readFileSync('./2022/day2/input.txt', 'utf8')

  const rounds = input.split('\n')

  const scoreRound = rounds.map(r => {
    const plays = r.split(' ')
    return getScore(opponentPlayMap[plays[0]], mePlayMap[plays[1]])
  })

  console.log("Answer 1: ", getSum(scoreRound))

  const scoreRound2 = rounds.map(r => getScore2(r))

  console.log("Answer 2: ", getSum(scoreRound2))
}

main()
