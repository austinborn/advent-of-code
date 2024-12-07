import { fetchExample, fetchInput } from '../../utils'

const solvePart1 = (input: string) => {
  let answer = 0

  let regex = /mul\([0-9]{1,3}\,[0-9]{1,3}\)/g
  let m = input.match(regex)

  for (let op of m) {
    let nums = op.slice(4, -1).split(',').map(n => parseInt(n))
    answer += nums[0] * nums[1]
  }

  return answer
}

const solvePart2 = (input: string) => {
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

  return answer
}

const main = async () => {
  const input = await fetchInput()
  const inputExample = await fetchExample()

  console.log('\nPart 1 (example):', solvePart1(inputExample))
  console.log('\nPart 1:', solvePart1(input))

  console.log('\nPart 2 (example):', solvePart2(inputExample))
  console.log('\nPart 2:', solvePart2(input))
}

main()
