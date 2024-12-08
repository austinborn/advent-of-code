import { fetchExample, fetchInput, withTime } from '../../utils'

const solvePart1 = (rows: string[]) => {
  let answer = 0

  const arr1 = []
  const arr2 = []

  for (let row of rows) {
    const nums = row.split('   ')
    arr1.push(nums[0])
    arr2.push(nums[1])
  }

  const sortedarr1 = arr1.sort()
  const sortedarr2 = arr2.sort()

  for (let i = 0; i < sortedarr1.length; i++) {
    answer += Math.abs(sortedarr1[i] - sortedarr2[i])
  }

  return answer
}

const solvePart2 = (rows: string[]) => {
  let answer = 0

  const arr1 = []
  const arr2 = []

  for (let row of rows) {
    const nums = row.split('   ')
    arr1.push(nums[0])
    arr2.push(nums[1])
  }

  const sortedarr1 = arr1.sort()
  const sortedarr2 = arr2.sort()

  const freq = {}

  for (let i = 0; i < sortedarr2.length; i++) {
    const num = sortedarr2[i]
    freq[num] = (freq[num] ?? 0) + 1
  }

  for (let i = 0; i < sortedarr1.length; i++) {
    const num = sortedarr1[i]
    answer += parseInt(num) * (freq[num] || 0)
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
