
import { readFileSync } from 'fs'
import { getSum, getMaxes } from '../../utils'

const main = async () => {
  console.log("Solving Puzzle:")
  const input = readFileSync('./2022/day1/input.txt', 'utf8')

  const elvesCalories = input.split('\n\n')
  const totalCal = elvesCalories.map(ec => getSum(ec.split('\n').map((s: string) => parseInt(s))))
  const max = getMaxes(totalCal, 1)

  console.log("Answer 1: ", max[0])

  const maxes = getMaxes(totalCal, 3)
  console.log("Answer 2: ", getSum(maxes))
}

main()
