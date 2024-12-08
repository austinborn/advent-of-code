import { fetchExample, fetchInput, withTime } from '../../utils'

const solvePart1 = (rows: string[]) => {
  let answer = 0

  // TODO

  return answer
}

const solvePart2 = (rows: string[]) => {
  let answer = 0

  // TODO

  return answer
}

const main = async () => {
  const input = (await fetchInput()).split('\n')
  const inputExample = (await fetchExample()).split('\n')

  console.log('\nPart 1 (example):', withTime(() => solvePart1(inputExample)))
  console.log('\nPart 1:', withTime(() => solvePart1(input)))

  console.log('\nPart 2 (example):', withTime(() => solvePart2(inputExample)))
  console.log('\nPart 2:', withTime(() => solvePart2(input)))
}

main()
