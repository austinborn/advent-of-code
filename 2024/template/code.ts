import { readFileSync } from 'fs'

const solvePart1 = (header: string, input: string) => {
  let answer = 0

  // TODO

  console.log(header, answer)
}

const solvePart2 = (header: string, input: string) => {
  let answer = 0

  // TODO

  console.log(header, answer)
}

const main = async () => {
  const input = readFileSync(`./${process.argv[2]}/day${process.argv[3]}/input.txt`, 'utf8')
  const inputExample = readFileSync(`./${process.argv[2]}/day${process.argv[3]}/inputExample.txt`, 'utf8')

  console.log("Solving Puzzle:")

  solvePart1('\nPart 1 (example): ', inputExample)
  solvePart1('\nPart 1: ', input)

  solvePart2('\nPart 2 (example): ', inputExample)
  solvePart2('\nPart 2: ', input)
}

main()
