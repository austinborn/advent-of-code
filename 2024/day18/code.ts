import { fetchExample, fetchInput, withTime } from '../../utils'

const solvePart1 = (input: string[], sim: number, dims: number) => {
  let bytes: { [x: number]: { [y: number]: boolean } } = {}
  for (let i = 0; i < sim; i++) {
    const [x, y] = input[i].split(',')
    if (!bytes[x]) bytes[x] = {}
    bytes[x][y] = true
  }

  let start = { x: 0, y: 0 }
  let exit = { x: dims, y: dims }

  let endFound = false
  let steps = 0
  let visited: { [x: number]: { [y: number]: boolean } } = {} = {}
  visited[start.x] = {}
  visited[start.x][start.y] = true

  let edgeNodes = [start]

  while (!endFound) {
    steps += 1
    let newEdgeNodes = []
    for (let node of edgeNodes) {
      const spacesToCheck = [
        { x: node.x + 1, y: node.y },
        { x: node.x, y: node.y - 1 },
        { x: node.x - 1, y: node.y },
        { x: node.x, y: node.y + 1 }
      ]

      for (let space of spacesToCheck) {
        if (space.x == exit.x && space.y == exit.y) {
          endFound = true
          break
        }
        if (bytes[space.x] && bytes[space.x][space.y]) continue
        if (space.x < 0 || space.x > dims || space.y < 0 || space.y > dims) continue
        if (!visited[space.x]) visited[space.x] = {}
        if (!visited[space.x][space.y]) {
          visited[space.x][space.y] = true
          newEdgeNodes.push(space)
        }
      }

      edgeNodes = newEdgeNodes
    }
  }
  return steps
}

const solvePart2 = (input: string[], sim: number, dims: number) => {
  let bytes: { [x: number]: { [y: number]: boolean } } = {}

  for (let i = 0; i < sim; i++) {
    const [x, y] = input[i].split(',')
    if (!bytes[x]) bytes[x] = {}
    bytes[x][y] = true
  }

  let start = { x: 0, y: 0 }
  let exit = { x: dims, y: dims }

  let nextByteIdx = sim
  let brokenPath = false

  while (true) {
    let visited: { [x: number]: { [y: number]: boolean } } = {} = {}
    visited[start.x] = {}
    visited[start.x][start.y] = true

    let [byteX, byteY] = input[nextByteIdx].split(',')
    if (!bytes[byteX]) bytes[byteX] = {}
    bytes[byteX][byteY] = true

    let endFound = false
    let edgeNodes = [start]
    while (!endFound && !brokenPath) {
      let newEdgeNodes = []
      for (let node of edgeNodes) {
        const spacesToCheck = [
          { x: node.x + 1, y: node.y },
          { x: node.x, y: node.y - 1 },
          { x: node.x - 1, y: node.y },
          { x: node.x, y: node.y + 1 }
        ]

        for (let space of spacesToCheck) {
          if (space.x == exit.x && space.y == exit.y) {
            endFound = true
            break
          }
          if (bytes[space.x] && bytes[space.x][space.y]) continue
          if (space.x < 0 || space.x > dims || space.y < 0 || space.y > dims) continue
          if (!visited[space.x]) visited[space.x] = {}
          if (!visited[space.x][space.y]) {
            visited[space.x][space.y] = true
            newEdgeNodes.push(space)
          }
        }
      }
      edgeNodes = newEdgeNodes
      if (!edgeNodes.length && !endFound) brokenPath = true
    }
    nextByteIdx += 1
    if (brokenPath) return `${byteX},${byteY}`
  }
}

const main = async () => {
  const input = (await fetchInput()).split('\n')
  const inputExample = (await fetchExample()).split('\n')

  console.log('\nPart 1 (example):', withTime(() => solvePart1(inputExample, 12, 6)))
  console.log('\nPart 1:', withTime(() => solvePart1(input, 1024, 70)))
  console.log('\nPart 2 (example):', withTime(() => solvePart2(inputExample, 12, 6)))
  console.log('\nPart 2:', withTime(() => solvePart2(input, 1024, 70)))
}

main()
