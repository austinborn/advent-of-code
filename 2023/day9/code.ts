import { fetchExample, fetchInput, withTime } from '../../utils'

const getEndNums = (nums: number[]) => {
  if (nums.filter(n => nums[0] != n).length > 0) {
    let diffSet = []
    for (let i = 0; i < nums.length-1; i++) {
      diffSet.push(nums[i+1] - nums[i])
    }
    let endNums = getEndNums(diffSet)
    return [
      nums[0] - endNums[0],
      nums[nums.length-1] + endNums[1]
    ]
  }
  else return [nums[0], nums[0]]
}

const solvePart1 = (rows: string[]) => {
  let answer = 0

  for (let row of rows) {
    const nums = row.split(' ').map(n => parseInt(n))
    answer += getEndNums(nums)[1]
  }

  return answer
}

const solvePart2 = (rows: string[]) => {
  let answer = 0

  for (let row of rows) {
    const nums = row.split(' ').map(n => parseInt(n))
    answer += getEndNums(nums)[0]
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
