
import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { getSum, getMaxes } from '../../utils'

const getLastDig = (word: string) => {
  let char
  let i = word.length - 1
  while (true) {
    const thisOne = word[i]
    char = parseInt(thisOne)
    console.log(char)
    if (char >= 0 && char <= 9) break
    if (word.slice(i,i+4) == 'zero') {
      char = 0
      break
    }
    if (word.slice(i,i+3) == 'one') {
      char = 1
      break
    }
    if (word.slice(i,i+3) == 'two') {
      char = 2
      break
    }
    if (word.slice(i,i+5) == 'three') {
      char = 3
      break
    }
    if (word.slice(i,i+4) == 'four') {
      char = 4
      break
    }
    if (word.slice(i,i+4) == 'five') {
      char = 5
      break
    }
    if (word.slice(i,i+3) == 'six') {
      char = 6
      break
    }
    if (word.slice(i,i+5) == 'seven') {
      char = 7
      break
    }
    if (word.slice(i,i+5) == 'eight') {
      char = 8
      break
    }
    if (word.slice(i,i+4) == 'nine') {
      char = 9
      break
    }
    i--
  }
  return char
}

const getFirstDig = (word: string) => {
  let char
  let i = 0
  while (true) {
    const thisOne = word[i]
    char = parseInt(thisOne)
    if (char >= 0 && char <= 9) break
    if (word.slice(i,i+4) == 'zero') {
      char = 0
      break
    }
    if (word.slice(i,i+3) == 'one') {
      char = 1
      break
    }
    if (word.slice(i,i+3) == 'two') {
      char = 2
      break
    }
    if (word.slice(i,i+5) == 'three') {
      char = 3
      break
    }
    if (word.slice(i,i+4) == 'four') {
      char = 4
      break
    }
    if (word.slice(i,i+4) == 'five') {
      char = 5
      break
    }
    if (word.slice(i,i+3) == 'six') {
      char = 6
      break
    }
    if (word.slice(i,i+5) == 'seven') {
      char = 7
      break
    }
    if (word.slice(i,i+5) == 'eight') {
      char = 8
      break
    }
    if (word.slice(i,i+4) == 'nine') {
      char = 9
      break
    }
    i++
  }
    return char
}

const main = async () => {
  console.log("Solving Puzzle:")
  const input = readFileSync('./2024/day1/input.txt', 'utf8')

  const lines = input.split('\n')

  const arr1 = []
  const arr2 = []

  for (let line of lines) {
    const nums = line.split('   ')
    arr1.push(nums[0])
    arr2.push(nums[1])
  }

  const sortedarr1 = arr1.sort()
  const sortedarr2 = arr2.sort()

  let sumDiff = 0
  for (let i = 0; i < sortedarr1.length; i++) {
    sumDiff += Math.abs(sortedarr1[i] - sortedarr2[i])
  }

  console.log('\nPart 1: ' + sumDiff)

  const freq = {}

  for (let i = 0; i < sortedarr2.length; i++) {
    const num = sortedarr2[i]
    freq[num] = (freq[num] ?? 0) + 1
  }

  let similarityScore = 0
  for (let i = 0; i < sortedarr1.length; i++) {
    const num = sortedarr1[i]
    console.log(num+'\n')
    similarityScore += parseInt(num) * (freq[num] || 0)
  }

  console.log('\nPart 2: ' + similarityScore)

}

main()
