import { fetchExample, fetchInput } from '../../utils'

const solvePart1 = (header: string, input: string) => {
  let answer = 0

  let regex = /mul\([0-9]{1,3}\,[0-9]{1,3}\)/g
  let m = input.match(regex)

  for (let op of m) {
    let nums = op.slice(4, -1).split(',').map(n => parseInt(n))
    answer += nums[0] * nums[1]
  }

  console.log(header, answer)
}

const solvePart2 = (header: string, input: string) => {
  let answer = 0

  let regex = /mul\([0-9]{1,3}\,[0-9]{1,3}\)|do\(\)|don't\(\)/g
  let m2 = input.match(regex)

  let enabled = true

  for (let op of m2) {
    if (op == 'do()') enabled = true
    else if (op == 'don\'t()') enabled = false
    else if (enabled) {
      let nums = op.slice(4, -1).split(',').map(n => parseInt(n))
      answer += nums[0] * nums[1]
    }
  }

  console.log(header, answer)
}

const main = async () => {
  const input = await fetchInput()
  const inputExample1 = await fetchExample("inputExample1")
  const inputExample2 = await fetchExample("inputExample2")

  solvePart1('\nPart 1 (example): ', inputExample1)
  solvePart1('\nPart 1: ', input)

  solvePart2('\nPart 2 (example): ', inputExample2)
  solvePart2('\nPart 2: ', input)
}

main()
