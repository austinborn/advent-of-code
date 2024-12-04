
import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { getSum, getMaxes } from '../../utils'
import { argv } from 'process'

const main = async () => {
  const [,,year, day] = process.argv
  const input = readFileSync(`./${year}/day${day}/input.txt`, 'utf8')

  console.log("Solving Puzzle:")

  const lines = input.split('\n')

  const arr1 = []
  const arr2 = []

  for (let line of lines) {
    const nums = line.split('   ')
    arr1.push(nums[0])
    arr2.push(nums[1])
  }

  const sortedarr1 = arr1.sort()
  const sortedarr2 = arr2.sort()

  let sumDiff = 0
  for (let i = 0; i < sortedarr1.length; i++) {
    sumDiff += Math.abs(sortedarr1[i] - sortedarr2[i])
  }

  console.log('\nPart 1: ' + sumDiff)

  const freq = {}

  for (let i = 0; i < sortedarr2.length; i++) {
    const num = sortedarr2[i]
    freq[num] = (freq[num] ?? 0) + 1
  }

  let similarityScore = 0
  for (let i = 0; i < sortedarr1.length; i++) {
    const num = sortedarr1[i]
    console.log(num+'\n')
    similarityScore += parseInt(num) * (freq[num] || 0)
  }

  console.log('\nPart 2: ' + similarityScore)

}

main()
