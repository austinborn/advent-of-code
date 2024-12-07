import { readFileSync } from 'fs'

const numsHasTest = (nums: number[], test: number) => {
  if(nums.length == 1) return nums[0] == test
  let [num1, num2, ...remainingNums] = [...nums]
  return (
    numsHasTest([num1+num2, ...remainingNums], test) ||
    numsHasTest([num1*num2, ...remainingNums], test)
  )
}

const numsHasTest2 = (nums: number[], test: number) => {
  if(nums.length == 1) return nums[0] == test
  let [num1, num2, ...remainingNums] = [...nums]
  return (
    numsHasTest2([num1+num2, ...remainingNums], test) ||
    numsHasTest2([num1*num2, ...remainingNums], test) ||
    numsHasTest2([parseInt(num1.toString()+num2.toString()), ...remainingNums], test)
  )
}

const solvePart1 = (header: string, input: string) => {
  let answer = 0

  const rows = input.split('\n')
  for (let row of rows) {
    const [test, numSet] = row.split(': ')
    const nums = numSet.split(' ').map(n => parseInt(n))
    if (numsHasTest(nums, parseInt(test))) answer += parseInt(test)
  }

  console.log(header, answer)
}

const solvePart2 = (header: string, input: string) => {
  let answer = 0

  const rows = input.split('\n')
  for (let row of rows) {
    const [test, numSet] = row.split(': ')
    const nums = numSet.split(' ').map(n => parseInt(n))
    if (numsHasTest2(nums, parseInt(test))) answer += parseInt(test)
  }

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
