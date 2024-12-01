
import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { getSum, getMaxes } from '../../utils'

const main = async () => {
  const [ , , year, day] = process.argv
  const input = readFileSync(`./${year}/day${day}/input.txt`, 'utf8')

  console.log("Solving Puzzle:")

  let answer1

  console.log('\nPart 1: ' + answer1)

  let answer2

  console.log('\nPart 2: ' + answer2)

}

main()
