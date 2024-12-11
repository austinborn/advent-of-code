import { fetchExample, fetchInput, withTime } from '../../utils'

const cache = {}

const numStonesForBlinks = (stones: number[], blinks: number) => {
  if (blinks == 0) return stones.length
  if (!cache[blinks]) cache[blinks] = {}

  let total = 0
  for (let oldStone of stones) {
    if (cache[blinks][oldStone]) total += cache[blinks][oldStone]
    else {
      let num
      if (oldStone == 0) {
        num = numStonesForBlinks([1], blinks - 1)
      } else if (oldStone.toString().length % 2 == 0) {
        const string = oldStone.toString()
        const left = parseInt(string.slice(0, string.length / 2))
        const right = parseInt(string.slice(string.length / 2))
        num = numStonesForBlinks([left, right], blinks - 1)
      } else {
        num = numStonesForBlinks([oldStone * 2024], blinks - 1)
      }
      cache[blinks][oldStone] = num
      total += num
    }
  }

  return total
}

const solvePart1 = (input: string[], blinkCount: number) => {
  let stones = input[0].split(' ').map(c => parseInt(c))
  return numStonesForBlinks(stones, blinkCount)
}

const solvePart2 = (input: string[], blinkCount: number) => {
  let stones = input[0].split(' ').map(c => parseInt(c))
  return numStonesForBlinks(stones, blinkCount)
}

const main = async () => {
  const input = (await fetchInput()).split('\n')
  const inputExample = (await fetchExample()).split('\n')

  console.log('\nPart 1 (example):', withTime(() => solvePart1(inputExample, 25)))
  console.log('\nPart 1:', withTime(() => solvePart1(input, 25)))
  console.log('\nPart 1:', withTime(() => solvePart2(inputExample, 75)))
  console.log('\nPart 2:', withTime(() => solvePart2(input, 75)))
}

main()
