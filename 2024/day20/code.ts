import { fetchExample, fetchInput, withTime } from '../../utils'

type Coord = { x: number, y: number }

const WALL = '#'
const START = "S"
const END = 'E'
const SPACE = '.'

const getSpacesCoords = (p: Coord, map: string[], maxDist: number) => {
  const xCheats = [0]
  const yCheats = [0]

  for (let diff = 1; diff <= maxDist; diff++) {
    if (p.x >= diff) xCheats.push(-diff)
    if (p.x <= map[0].length -diff-1) xCheats.push(diff)
    if (p.y >= diff) yCheats.push(-diff)
    if (p.y <= map.length - diff-1) yCheats.push(diff)
  }

  let cheats: Coord[] = []

  for (let x of xCheats) {
    for (let y of yCheats) {
      const dist = Math.abs(x) + Math.abs(y)
      if (dist > 1 && dist <= maxDist) cheats.push({ x: p.x + x, y: p.y + y })
    }
  }

  return cheats
}

const getNextCoords = (p: Coord, map: string[]) => {
  const xSteps = []
  const ySteps = []
    if (p.x > 0) xSteps.push(-1)
    if (p.x < map[0].length-1) xSteps.push(1)
    if (p.y > 0) ySteps.push(-1)
    if (p.y < map.length-1) ySteps.push(1)

  const next: Coord[] = []
  for (let x of xSteps) if (x !== 0) next.push({ x: p.x + x, y: p.y })
  for (let y of ySteps) if (y !== 0) next.push({ x: p.x, y: p.y + y })
  
  return next
}

const solvePart = (map: string[], timeSaved: number, maxDist: number) => {
  let start: Coord
  let end: Coord

  const coordData: { [x: number]: { [y: number]: {
    cheats: Coord[]
    distToEnd: number
    visited: boolean
  } } } = {}

  let spaceCount = 1
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      const pos = { x: j, y: i }
      if (map[j][i] == WALL) continue

      if (!coordData[j]) coordData[j] = {}
      coordData[j][i] = {
        cheats: getSpacesCoords(pos, map, maxDist).filter(cheat =>  map[cheat.x][cheat.y] != WALL),
        distToEnd: 0,
        visited: false
      }
      if (map[j][i] == START) start = pos
      else if (map[j][i] == END) end = pos
      else if (map[j][i] == SPACE) spaceCount += 1
    }
  }

  let thisCoord = start
  let char = map[thisCoord.x][thisCoord.y]

  while (spaceCount > 0) {
    coordData[thisCoord.x][thisCoord.y].distToEnd = spaceCount
    coordData[thisCoord.x][thisCoord.y].visited = true

    const nextCoords = getNextCoords(thisCoord, map).filter(s => coordData[s.x] && coordData[s.x][s.y] && !coordData[s.x][s.y].visited)
    spaceCount -= 1
    thisCoord = nextCoords[0]
    char = map[thisCoord.x][thisCoord.y]
  }

  let count = 0
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[x][y] == WALL) continue
      const thisCoord = coordData[x][y]

      for (let cheat of thisCoord.cheats) {
        const cheatCoord = coordData[cheat.x][cheat.y]
        const dist = Math.abs(cheat.x - x) + Math.abs(cheat.y - y)
        if (thisCoord.distToEnd - cheatCoord.distToEnd - dist >= timeSaved) count += 1
      }
    }
  }

  return count
}


const main = async () => {
  const input = (await fetchInput()).split('\n')
  const inputExample = (await fetchExample()).split('\n')

  console.log('\nPart 1 (example):', withTime(() => solvePart(inputExample, 2, 2)))
  console.log('\nPart 1:', withTime(() => solvePart(input, 100, 2)))

  console.log('\nPart 2 (example):', withTime(() => solvePart(inputExample, 50, 20)))
  console.log('\nPart 2:', withTime(() => solvePart(input, 100, 20)))
}

main()
