
import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { getSum, getMaxes } from '../../utils'

const main = async () => {
  console.log("Solving Puzzle:")
  const input = readFileSync('./2023/day0/input.txt', 'utf8')

  console.log("Answer 1: ", input)
}

main()
