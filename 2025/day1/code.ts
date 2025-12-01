import { fetchExample, fetchInput, getMod, withTime } from '../../utils'

const DIAL_START = 50
const DIAL_SIZE = 100

const solvePart1 = (input: string[]) => {
  let dial = DIAL_START
  let password = 0

  for (let row of input) {
    const dir = row[0]
    const num = parseInt(row.slice(1))

    dir == 'L'
      ? dial = getMod(dial - num, DIAL_SIZE)
      : dial = getMod(dial + num, DIAL_SIZE)

    if (dial == 0) password += 1
  }

  return password
}

const solvePart2 = (input: string[]) => {
  let dial = DIAL_START
  let password = 0

  for (let row of input) {
    const dir = row[0]
    const num = parseInt(row.slice(1))

      if (dir == 'L') {
        if (dial - num <= 0) {
          password += (dial > 0 ? 1 : 0) + Math.floor((num - dial) / DIAL_SIZE)
        }
        dial = getMod(dial - num, DIAL_SIZE)
      } else {
        if (dial + num >= DIAL_SIZE) {
          password += Math.floor((dial + num) / DIAL_SIZE)
        }
        dial = getMod(dial + num, DIAL_SIZE)
      }
  }

  return password
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
