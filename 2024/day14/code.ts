import {
  fetchExample,
  fetchInput,
  getFilledMatrix,
  getMod,
  withTime,
  withTimeAsync
} from '../../utils'

const getRobots = (input: string[]) => input.map(i => {
  const [p, v] = i.split(' ')
  return {
    p: {
      x: parseInt(p.split(',')[0].slice(2)),
      y: parseInt(p.split(',')[1])
    },
    v: {
      x: parseInt(v.split(',')[0].slice(2)),
      y: parseInt(v.split(',')[1])
    }
  }
})

const printMap = (robots: any[], steps: number, width, height) => {
  const map = getFilledMatrix([height, width], " ")

  for (let r of robots) {
    const x = getMod(r.p.x + r.v.x * steps, width)
    const y = getMod(r.p.y + r.v.y * steps, height)

    map[y][x] = "X"
  }

  console.log(map.map(r => r.join("")).join('\n'))
}

const solvePart1 = (input: string[], width: number, height: number) => {
  let robots = getRobots(input)

  const STEPS = 100

  let quads = { "NW": 0, "NE": 0, "SW": 0, "SE": 0 }
  let quadOpts = Object.keys(quads)
  
  for (let r of robots) {
    const x = getMod(r.p.x + r.v.x * STEPS, width)
    const y = getMod(r.p.y + r.v.y * STEPS, height)

    const ew = x > Math.floor(width/2) ? "E" : x < Math.floor(width/2) ? "W" : ""
    const ns = y > Math.floor(height/2) ? "N" : y < Math.floor(height/2) ? "S" : ""

    if (quadOpts.includes(ns+ew)) quads[ns+ew] += 1
  }

  return Object.entries(quads).reduce((sum, q) => sum * q[1], 1)
}

const solvePart2 = async (input: string[], width, height) => {
  let robots = getRobots(input)

  // Step 1. Use the following to see 2 patterns emerge with a given frequency.
  //         You find that many robots will be in top half every 86 + 103X steps,
  //         and many robots will be in right half every 28 + 101Y steps.
  let steps = 0
  while (steps < 340) {
    if ((steps % 103 == 86) || (steps % 101 == 28)) {
      console.log(`Map for step ${steps}:`)
      printMap(robots, steps, width, height)
      await new Promise(resolve => setTimeout(resolve, 250)) //250ms
    }
    steps += 1
  }

  // Step 2. Use the following to find the intersection of these recurring patterns.
  steps = 0
  while ((steps % 103 != 86) || (steps % 101 != 28)) steps +=1

  console.log(`Map for step ${steps}:`)
  printMap(robots, steps, width, height)

  return steps
}

const main = async () => {
  const input = (await fetchInput()).split('\n')
  const inputExample = (await fetchExample()).split('\n')

  console.log('\nPart 1 (example):', withTime(() => solvePart1(inputExample, 11, 7)))
  console.log('\nPart 1:', withTime(() => solvePart1(input, 101, 103)))

  console.log('\nPart 2:', await withTimeAsync(async () => solvePart2(input, 101, 103)))
}

main()
