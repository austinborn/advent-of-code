import { fetchExample, fetchInput } from '../../utils'

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

const solvePart1 = (header: string, rows: string[]) => {
  let answer = 0

  for (let row of rows) {
    const [test, numSet] = row.split(': ')
    const nums = numSet.split(' ').map(n => parseInt(n))
    if (numsHasTest(nums, parseInt(test))) answer += parseInt(test)
  }

  console.log(header, answer)
}

const solvePart2 = (header: string, rows: string[]) => {
  let answer = 0

  for (let row of rows) {
    const [test, numSet] = row.split(': ')
    const nums = numSet.split(' ').map(n => parseInt(n))
    if (numsHasTest2(nums, parseInt(test))) answer += parseInt(test)
  }

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
