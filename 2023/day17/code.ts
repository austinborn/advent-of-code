import { fetchExample, fetchInput, withTime } from '../../utils'

const getNextNeighbors = (x: number, y: number, maxX: number, maxY: number) => {
  let neighbors: {x: number, y: number, dir: string }[] = []
  if (x > 0) neighbors.push({x: x-1, y, dir: 'up'})
  if (x < maxX) neighbors.push({x: x+1, y, dir: 'down'})
  if (y > 0) neighbors.push({x, y: y-1, dir: 'left'})
  if (y < maxY) neighbors.push({x, y: y+1, dir: 'right'})
  return neighbors
}

const solvePart1 = (rows: string[]) => {
  const blockData: { [x: number]: { [y: number]: {
    minHeatLoss: number,
    lastLegs: { [dir: string]: number }
  } } } = {}

  const leadingBlocks = new Set<string>()
  leadingBlocks.add(`0,0`)
  blockData[0] = {}
  blockData[0][0] = { minHeatLoss: 0, lastLegs: {} }

  while(leadingBlocks.size > 0) {
    for (let leadingBlock of leadingBlocks) {
      const [blockX, blockY] = leadingBlock.split(',').map(c => parseInt(c))
      const curBlockData = blockData[blockX][blockY]

      const neighbors = getNextNeighbors(blockX, blockY, rows.length - 1, rows[0].length - 1)
      for (let neighbor of neighbors) {
        if (curBlockData.lastLegs[neighbor.dir] == 3) continue

        const minHeatLoss = curBlockData.minHeatLoss + parseInt(rows[neighbor.x][neighbor.y])

        if (!blockData[neighbor.x]) {
          blockData[neighbor.x] = {}
        } else if (
            blockData[neighbor.x][neighbor.y] &&
            minHeatLoss > blockData[neighbor.x][neighbor.y].minHeatLoss
        ) continue

        const lastLegs = blockData[neighbor.x][neighbor.y] && minHeatLoss == blockData[neighbor.x][neighbor.y].minHeatLoss
          ? { ...blockData[neighbor.x][neighbor.y].lastLegs }
          : {}

        lastLegs[neighbor.dir] = Math.min(
          (curBlockData.lastLegs[neighbor.dir] ?? 0) + 1,
          lastLegs[neighbor.dir] ?? 1
        )

        leadingBlocks.add(`${neighbor.x},${neighbor.y}`)
        blockData[neighbor.x][neighbor.y] = { minHeatLoss, lastLegs }
      }
      leadingBlocks.delete(leadingBlock)
    }
  }

  //840: That's not the right answer; your answer is too low.
  //1023: That's not the right answer; your answer is too high. Curiously, it's the right answer for someone else; you might be logged in to the wrong account or just unlucky.
  let pointList = []
  let x = rows.length-1
  let y = rows[0].length-1
  pointList.push(blockData[x][y])
  for (let i = 0; i < 20; i++) {
    const dir = Object.keys(blockData[x][y].lastLegs)[0]
    const dist = blockData[x][y].lastLegs[dir]
    if (dir == 'up') {
      pointList.push(blockData[x-dist][y])
      x -= dist
    } else if (dir == 'down') {
      pointList.push(blockData[x+dist][y])
      x += dist
    } else if (dir == 'left') {
      pointList.push(blockData[x][y-dist])
      y -= dist
    } else if (dir == 'right') {
      pointList.push(blockData[x][y+dist])
      y += dist
    }
  }

  console.log(pointList)
  
  return blockData[rows.length-1][rows[0].length-1].minHeatLoss
}

const solvePart2 = (rows: string[]) => {
  let answer = 0

  // TODO

  return answer
}

const main = async () => {
  const input = (await fetchInput()).split('\n')
  const inputExample = (await fetchExample()).split('\n')

  console.log('\nPart 1 (example: 102):', withTime(() => solvePart1(inputExample)))
  console.log('\nPart 1:', withTime(() => solvePart1(input)))

  console.log('\nPart 2 (example):', withTime(() => solvePart2(inputExample)))
  console.log('\nPart 2:', withTime(() => solvePart2(input)))
}

main()
