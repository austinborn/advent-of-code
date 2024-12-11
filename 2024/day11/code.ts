import { fetchExample, fetchInput, withTime } from '../../utils'

const finalStoneCount = {}

const getNumStones = (stones: number[], blinksLeft: number) => {
  if (blinksLeft == 0) return stones.length
  if (!finalStoneCount[blinksLeft]) finalStoneCount[blinksLeft] = {}

  let total = 0
  for (let stone of stones) {
    if (finalStoneCount[blinksLeft][stone]) total += finalStoneCount[blinksLeft][stone]
    else {
      let num
      if (stone == 0) {
        num = getNumStones([1], blinksLeft - 1)
      } else if (stone.toString().length % 2 == 0) {
        const string = stone.toString()
        const left = parseInt(string.slice(0, string.length / 2))
        const right = parseInt(string.slice(string.length / 2))
        num = getNumStones([left, right], blinksLeft - 1)
      } else {
        num = getNumStones([stone * 2024], blinksLeft - 1)
      }
      finalStoneCount[blinksLeft][stone] = num
      total += num
    }
  }

  return total
}

const solve = (input: string[], blinkCount: number) => {
  let stones = input[0].split(' ').map(c => parseInt(c))
  return getNumStones(stones, blinkCount)
}

const main = async () => {
  const input = (await fetchInput()).split('\n')
  const inputExample = (await fetchExample()).split('\n')

  console.log('\nPart 1 (example):', withTime(() => solve(inputExample, 25)))
  console.log('\nPart 1:', withTime(() => solve(input, 25)))
  console.log('\nPart 1:', withTime(() => solve(inputExample, 75)))
  console.log('\nPart 2:', withTime(() => solve(input, 75)))
}

main()
