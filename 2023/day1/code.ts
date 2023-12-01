
import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { getSum, getMaxes } from '../../utils'

// const getFirstDig = (word: string) => {
//   let char
//   let i = 0
//   while (true) {
//     const thisOne = word[i]
//     char = parseInt(thisOne)
//     console.log(char)
//     if (char >= 0 && char <= 9) break
//     i++
//   }
//     return char
// }

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
  const input = readFileSync('./2023/day1/input.txt', 'utf8')

  const words = input.split('\n')

  console.log(getFirstDig(words[0]))

  const digits = getSum(words.map(w => {
    const first = getFirstDig(w) * 10
    const last = getLastDig(w)
    console.log({first, last})
    return first + last
  }
    ))

  console.log("Answer 1: ", digits)

}

main()
