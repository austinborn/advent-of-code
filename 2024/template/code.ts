import { fetchExample, fetchInput } from '../../utils'

const solvePart1 = (header: string, rows: string[]) => {
  let answer = 0

  // TODO

  console.log(header, answer)
}

const solvePart2 = (header: string, rows: string[]) => {
  let answer = 0

  // TODO

  console.log(header, answer)
}

const main = async () => {
  const input = (await fetchInput()).split('\n')
  const inputExample = (await fetchExample()).split('\n')

  solvePart1('\nPart 1 (example): ', inputExample)
  solvePart1('\nPart 1: ', input)

  solvePart2('\nPart 2 (example): ', inputExample)
  solvePart2('\nPart 2: ', input)
}

main()
