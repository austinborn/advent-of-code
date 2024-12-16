import { fetchExample, fetchInput, withTime, getFilledMatrix } from '../../utils'

type Coord = { x: number, y: number, dir?: string }

type Path = {
  nodes: Set<string>
  head: Coord
  score: number
}

const END = 'E'
const SPACE = '.'
const START = 'S'
const UP = 'UP'
const DOWN = 'DOWN'
const LEFT = 'LEFT'
const RIGHT = 'RIGHT'

const solvePart1 = (input: string[]) => {
  let start: Coord
  let end: Coord

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const char = input[i][j]
      if (char == START) start = { x: j, y: i, dir: RIGHT }
      else if (char == END) end = { x: j, y: i }
    }
  }

  const paths: { [id: number]: Path } = {}

  const pathIdsAtScore: { [score: number]: number[] } = {}

  const scoreCache: { [score: number]: { same: number, diff: number } } = {}

  const smallestScoreForNode: {
    [node: string]: {
      score: number
      pathIds: number[]
    }
  } = {}

  const memoizedScore = (sameDir: boolean, score: number) => {
    if (!scoreCache[score]) {
      scoreCache[score] = {
        same: score + 1,
        diff: score + 1001
      }
    }
    return sameDir ? scoreCache[score].same : scoreCache[score].diff
  }

  let openId = 0

  const addPath = (head: Coord, nodeSet: string[], score: number) => {
    paths[openId] = { nodes: new Set(nodeSet), head, score }
    if (pathIdsAtScore[score] == undefined) pathIdsAtScore[score] = [openId]
    else pathIdsAtScore[score].push(openId)
    return openId++
  }

  addPath(start, [`${start.x}-${start.y}`], 0)

  let endFound = false
  let score = 0
  smallestScoreForNode[`${start.x}-${start.y}-${start.dir}`] = {
    score,
    pathIds: [0]
  }
  while (!endFound) {
    let pathIds = pathIdsAtScore[score]

    if (pathIds == undefined) {
      score += 1
      continue
    }

    for (let pathId of pathIds) {
      let path = paths[pathId]
      if (path.head.x == end.x && path.head.y == end.y) {
        endFound = true
        break
      }

      const spacesToCheck: Coord[] = [
        { x: path.head.x + 1, y: path.head.y, dir: RIGHT },
        { x: path.head.x, y: path.head.y - 1, dir: UP },
        { x: path.head.x - 1, y: path.head.y, dir: LEFT },
        { x: path.head.x, y: path.head.y + 1, dir: DOWN }
      ]

      for (let space of spacesToCheck) {
        const nextChar = input[space.y][space.x]
        if (nextChar == SPACE) {
          if (path.nodes.has(`${space.x}-${space.y}`)) continue
          if (smallestScoreForNode[`${space.x}-${space.y}-${space.dir}`] == undefined) {
            smallestScoreForNode[`${space.x}-${space.y}-${space.dir}`] = {
              score,
              pathIds: [pathId]
            }
          } else {
            if (smallestScoreForNode[`${space.x}-${space.y}-${space.dir}`].score < score) continue
            else if (smallestScoreForNode[`${space.x}-${space.y}-${space.dir}`].score == score) {
              smallestScoreForNode[`${space.x}-${space.y}-${space.dir}`].pathIds.push(pathId)
            } else {
              for (let oldPathId of smallestScoreForNode[`${space.x}-${space.y}-${space.dir}`].pathIds) {
                delete paths[oldPathId]
              }
              smallestScoreForNode[`${space.x}-${space.y}-${space.dir}`].pathIds = [pathId]
            }
          }
          let newNodeSet = []
          for (let node of path.nodes.values()) newNodeSet.push(node)
          newNodeSet.push(`${space.x}-${space.y}`)
          let newScore = memoizedScore(path.head.dir == space.dir, path.score)
          addPath(space, newNodeSet, newScore)
        } else if (nextChar == END) {
          let newScore = memoizedScore(path.head.dir == space.dir, path.score)
          addPath(space, [], newScore)
        }
      }

      delete paths[pathId]
    }

    delete pathIdsAtScore[score]

    score += 1
  }

  return score - 1
}

const solvePart2 = (input: string[]) => {
  let start: Coord
  let end: Coord

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      const char = input[i][j]
      if (char == START) start = { x: j, y: i, dir: RIGHT }
      else if (char == END) end = { x: j, y: i }
    }
  }

  const bestNodes = new Set()

  const paths: { [id: number]: Path } = {}

  const pathIdsAtScore: { [score: number]: number[] } = {}

  const scoreCache: { [score: number]: { same: number, diff: number } } = {}

  const smallestScoreForNode: {
    [node: string]: {
      score: number
      pathIds: number[]
    }
  } = {}

  const memoizedScore = (sameDir: boolean, score: number) => {
    if (!scoreCache[score]) {
      scoreCache[score] = {
        same: score + 1,
        diff: score + 1001
      }
    }
    return sameDir ? scoreCache[score].same : scoreCache[score].diff
  }

  let openId = 0

  const addPath = (head: Coord, nodeSet: string[], score: number) => {
    paths[openId] = { nodes: new Set(nodeSet), head, score }
    if (pathIdsAtScore[score] == undefined) pathIdsAtScore[score] = [openId]
    else pathIdsAtScore[score].push(openId)
    return openId++
  }

  addPath(start, [`${start.x}-${start.y}`], 0)

  let endFound = false
  let score = 0
  smallestScoreForNode[`${start.x}-${start.y}-${start.dir}`] = {
    score,
    pathIds: [0]
  }
  while (!endFound) {
    let pathIds = pathIdsAtScore[score]

    if (pathIds == undefined) {
      score += 1
      continue
    }

    for (let pathId of pathIds) {
      let path = paths[pathId]
      if (path.head.x == end.x && path.head.y == end.y) {
        bestNodes.add(`${end.x}-${end.y}`)
        endFound = true
        break
      }

      const spacesToCheck: Coord[] = [
        { x: path.head.x + 1, y: path.head.y, dir: RIGHT },
        { x: path.head.x, y: path.head.y - 1, dir: UP },
        { x: path.head.x - 1, y: path.head.y, dir: LEFT },
        { x: path.head.x, y: path.head.y + 1, dir: DOWN }
      ]

      for (let space of spacesToCheck) {
        const nextChar = input[space.y][space.x]
        if (nextChar == SPACE) {
          if (path.nodes.has(`${space.x}-${space.y}`)) continue
          if (smallestScoreForNode[`${space.x}-${space.y}-${space.dir}`] == undefined) {
            smallestScoreForNode[`${space.x}-${space.y}-${space.dir}`] = {
              score,
              pathIds: [pathId]
            }
          } else {
            if (smallestScoreForNode[`${space.x}-${space.y}-${space.dir}`].score < score - 2000) continue // IDK why this works
            else if (smallestScoreForNode[`${space.x}-${space.y}-${space.dir}`].score == score) {
              smallestScoreForNode[`${space.x}-${space.y}-${space.dir}`].pathIds.push(pathId)
            } else {
              for (let oldPathId of smallestScoreForNode[`${space.x}-${space.y}-${space.dir}`].pathIds) {
                delete paths[oldPathId]
              }
              smallestScoreForNode[`${space.x}-${space.y}-${space.dir}`].pathIds = [pathId]
            }
          }
          let newNodeSet = []
          for (let node of path.nodes.values()) newNodeSet.push(node)
          newNodeSet.push(`${space.x}-${space.y}`)
          let newScore = memoizedScore(path.head.dir == space.dir, path.score)
          addPath(space, newNodeSet, newScore)
        } else if (nextChar == END) {
          for (let node of path.nodes.values()) bestNodes.add(node)
          let newScore = memoizedScore(path.head.dir == space.dir, path.score)
          addPath(space, [], newScore)
        }
      }

      delete paths[pathId]
    }

    delete pathIdsAtScore[score]

    score += 1
  }

  return bestNodes.size
}

const main = async () => {
  const input = (await fetchInput()).split('\n')
  const inputExample = (await fetchExample()).split('\n')
  const inputExample2 = (await fetchExample("inputExample2")).split('\n')


  console.log('\nPart 1 (example):', withTime(() => solvePart1(inputExample)))
  console.log('\nPart 1 (example 2):', withTime(() => solvePart1(inputExample2)))
  console.log('\nPart 1:', withTime(() => solvePart1(input)))

  console.log('\nPart 2 (example):', withTime(() => solvePart2(inputExample)))
  console.log('\nPart 2 (example 2):', withTime(() => solvePart2(inputExample2)))

  console.log('\nPart 2:', withTime(() => solvePart2(input)))
}

main()
