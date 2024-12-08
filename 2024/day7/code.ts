import { fetchExample, fetchInput, withTime } from '../../utils'

const numsHasTest = (nums: number[], test: number) => {
  if (nums[0] > test) return false
  if(nums.length == 1) return nums[0] == test
  let [num1, num2, ...remainingNums] = nums
  return (
    numsHasTest([num1*num2, ...remainingNums], test) ||
    numsHasTest([num1+num2, ...remainingNums], test)
  )
}

const numsHasTest2 = (nums: number[], test: number) => {
  if (nums[0] > test) return false
  if(nums.length == 1) return nums[0] == test
  let [num1, num2, ...remainingNums] = nums
  return (
    numsHasTest2([num1*num2, ...remainingNums], test) ||
    numsHasTest2([num1+num2, ...remainingNums], test) ||
    numsHasTest2([parseInt(`${num1.toString()}${num2.toString()}`), ...remainingNums], test)
  )
}

const solvePart1 = (rows: string[]) => {
  let answer = 0

  for (let row of rows) {
    const [test, numSet] = row.split(': ')
    const nums = numSet.split(' ').map(n => parseInt(n))
    let testInt = parseInt(test)
    if (numsHasTest(nums, testInt)) answer += testInt
  }

  return answer
}

const solvePart2 = (rows: string[]) => {
  let answer = 0

  for (let row of rows) {
    const [test, numSet] = row.split(': ')
    const nums = numSet.split(' ').map(n => parseInt(n))
    let testInt = parseInt(test)
    if (numsHasTest2(nums, testInt)) answer += testInt
  }

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
