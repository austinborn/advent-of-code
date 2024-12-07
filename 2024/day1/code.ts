import { fetchExample, fetchInput } from '../../utils'

const solvePart1 = (header: string, rows: string[]) => {
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

  console.log(header, answer)
}

const solvePart2 = (header: string, rows: string[]) => {
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
