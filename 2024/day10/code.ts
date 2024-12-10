import { fetchExample, fetchInput, withTime } from '../../utils'

const parseIntegerMatrix = (input: string[]) => input.map(i => i.split('').map(c => parseInt(c)))

const getTrailHeads = (map: number[][]) => {
  let heads: {x: number, y: number}[] = []
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[0].length; y++) {
      if (map[x][y] == 0) heads.push({x,y})
    }
  }
  return heads
}

const getNumTrails: ((map: number[][], x: number, y: number) => string[]) = (map, x, y) => {
  const int = map[x][y]
  if (int == 9) return [`${x},${y}`]

  const answer = []
  if (x - 1 >= 0            && map[x-1][y] == int + 1) answer.push(...getNumTrails(map, x-1, y))
  if (x + 1 < map.length    && map[x+1][y] == int + 1) answer.push(...getNumTrails(map, x+1, y))
  if (y - 1 >= 0            && map[x][y-1] == int + 1) answer.push(...getNumTrails(map, x, y-1))
  if (y + 1 < map[0].length && map[x][y+1] == int + 1) answer.push(...getNumTrails(map, x, y+1))
  return answer
}

const solvePart1 = (input: string[]) => {
  let map = parseIntegerMatrix(input)
  let heads = getTrailHeads(map)
  let answer = 0

  for (let head of heads) {
    let peaks = getNumTrails(map, head.x, head.y)
    let peakSet = new Set(peaks)
    answer += peakSet.size
  }

  return answer
}

const solvePart2 = (input: string[]) => {
  let map = parseIntegerMatrix(input)
  let heads = getTrailHeads(map)
  let answer = 0

  for (let head of heads) {
    let peaks = getNumTrails(map, head.x, head.y)
    answer += peaks.length
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
