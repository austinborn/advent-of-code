import { fetchExample, fetchInput, getFilledMatrix, withTime } from '../../utils'

const ROWS = 7
const COLS = 5
const FILLED = '#'

const solvePart1 = (input: string[]) => {
  const keys: string[] = []
  const locks: string[] = []
  for (let object of input) {
    const rows = object.split('\n')

    const numList: number[] = rows.reduce((nums, r) => {
      for (let i = 0; i < COLS; i++) if (r[i] == FILLED) nums[i] += 1
      return nums
    }, getFilledMatrix([5], 0))

    const numString: string = numList.join('')

    if (rows[0] == '#####') locks.push(numString)
    else keys.push(numString)
  }

  let answer = 0

  for (let key of keys) {
    for (let lock of locks) {
      let fits = true
      for (let i = 0; i < COLS; i++) {
        if (parseInt(key[i]) + parseInt(lock[i]) > ROWS) {
          fits = false
          break
        }
      }
      if (fits) answer += 1
    }
  }

  return answer
}

const solvePart2 = (input: string[]) => {
  

  return 0
}

const main = async () => {
  const input = (await fetchInput()).split('\n\n')
  const inputExample = (await fetchExample()).split('\n\n')

  console.log('\nPart 1 (example):', withTime(() => solvePart1(inputExample)))
  console.log('\nPart 1:', withTime(() => solvePart1(input)))

  console.log('\nPart 2 (example):', withTime(() => solvePart2(inputExample)))
  console.log('\nPart 2:', withTime(() => solvePart2(input)))
}

main()