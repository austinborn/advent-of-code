
import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { getSum, getMaxes } from '../../utils'

const main = async () => {
  const input = readFileSync(`./${process.argv[2]}/day${process.argv[3]}/input.txt`, 'utf8')

  console.log("Solving Puzzle:")

  let regex = /mul\([0-9]{1,3}\,[0-9]{1,3}\)/g
  let m = input.match(regex)

  let answer1 = 0

  for (let op of m) {
    let nums = op.slice(4, -1).split(',').map(n => parseInt(n))
    answer1 += nums[0] * nums[1]
  }

  console.log('\nPart 1: ' + answer1)

  let regex2 = /mul\([0-9]{1,3}\,[0-9]{1,3}\)|do\(\)|don't\(\)/g
  let m2 = input.match(regex2)

  let answer2 = 0

  let enabled = true

  for (let op of m2) {
    if (op == 'do()') enabled = true
    else if (op == 'don\'t()') enabled = false
    else if (enabled) {
      let nums = op.slice(4, -1).split(',').map(n => parseInt(n))
      answer2 += nums[0] * nums[1]
    }
  }

  console.log('\nPart 2: ' + answer2)

}

main()
