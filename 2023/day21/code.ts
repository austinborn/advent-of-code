import { fetchExample, fetchInput, withTime } from '../../utils'

const getStartingPos = (rows: string[]) => {
  for (let x = 0; x < rows.length; x++) {
    for (let y = 0; y < rows[0].length; y++) {
      if (rows[x][y] == 'S') return { x, y }
    }
  }

  return { x: 0, y: 0 }
}

const solvePart1 = (rows: string[], steps: number) => {
  let answer = 0

  const { x, y } = getStartingPos(rows)

  const startingPosParity = (x + y) % 2

  let validPos = new Set<string>()
  validPos.add(`${x},${y}`)

  let leadingPos =[{x, y}]
  let nextLeadingPos = []

  for (let i = 0; i < steps; i++) {
    for (let pos of leadingPos) {
      let {x: posX, y: posY } = pos
      if (posX > 0 && rows[posX-1][posY] == '.') {
        if (!validPos.has(`${posX-1},${posY}`)) {
          validPos.add(`${posX-1},${posY}`)
          nextLeadingPos.push({ x: posX-1, y: posY })
        }
      }
      if (posX < (rows.length - 1) && rows[posX+1][posY] == '.') {
        if (!validPos.has(`${posX+1},${posY}`)) {
          validPos.add(`${posX+1},${posY}`)
          nextLeadingPos.push({ x: posX+1, y: posY })
        }
      }
      if (posY > 0 && rows[posX][posY-1] == '.') {
        if (!validPos.has(`${posX},${posY-1}`)) {
          validPos.add(`${posX},${posY-1}`)
          nextLeadingPos.push({ x: posX, y: posY-1 })
        }
      }
      if (posY < (rows[0].length - 1) && rows[posX][posY+1] == '.') {
        if (!validPos.has(`${posX},${posY+1}`)) {
          validPos.add(`${posX},${posY+1}`)
          nextLeadingPos.push({ x: posX, y: posY+1 })
        }
      }
    }
    leadingPos = nextLeadingPos
    nextLeadingPos = []
  }

  for (let pos of validPos) {
    let [x, y] = pos.split(',')
    if ((parseInt(x) + parseInt(y)) % 2 == startingPosParity) answer += 1
  }

  return answer
}

const solvePart2 = (rows: string[], steps: number) => {
  const { x, y } = getStartingPos(rows)

  const startingPosParity = (x + y) % 2

  let spotsAccessible = {}
  let dir = [-1,0,1]
  for (let vertical of dir) {
    spotsAccessible[vertical] = {}
    for (let horizontal of dir) {
      spotsAccessible[vertical][horizontal] = {}

      let visitedPos = {}

      let leadingPos = [{
        x: x * (vertical + 1),
        y: y * (horizontal + 1)
      }]

      let validPos = new Set<string>()
      validPos.add(`${leadingPos[0].x},${leadingPos[0].y}`)

      let nextLeadingPos = []

      // TODO
    }
  }



  // let validPos = new Set<string>()
  // validPos.add(`${x},${y}`)

  // let leadingPos =[{x, y}]
  // let nextLeadingPos = []

  // const maxX = rows.length
  // const maxY = rows[0].length

  // for (let i = 0; i < steps; i++) {
  //   for (let pos of leadingPos) {
  //     let {x: posX, y: posY } = pos

  //     if (rows[modCacheX[posX-1]][modCacheY[posY]] == '.') {
  //       if (!validPos.has(`${posX-1},${posY}`)) {
  //         validPos.add(`${posX-1},${posY}`)
  //         nextLeadingPos.push({ x: posX-1, y: posY })
  //       }
  //     }
  //     if (rows[modCacheX[posX+1]][modCacheY[posY]] == '.') {
  //       if (!validPos.has(`${posX+1},${posY}`)) {
  //         validPos.add(`${posX+1},${posY}`)
  //         nextLeadingPos.push({ x: posX+1, y: posY })
  //       }
  //     }
  //     if (rows[modCacheX[posX]][modCacheY[posY-1]] == '.') {
  //       if (!validPos.has(`${posX},${posY-1}`)) {
  //         validPos.add(`${posX},${posY-1}`)
  //         nextLeadingPos.push({ x: posX, y: posY-1 })
  //       }
  //     }
  //     if (rows[modCacheX[posX]][modCacheY[posY+1]] == '.') {
  //       if (!validPos.has(`${posX},${posY+1}`)) {
  //         validPos.add(`${posX},${posY+1}`)
  //         nextLeadingPos.push({ x: posX, y: posY+1 })
  //       }
  //     }
  //   }
  //   leadingPos = nextLeadingPos
  //   nextLeadingPos = []
  // }

  // for (let pos of validPos) {
  //   let [x, y] = pos.split(',')
  //   if ((parseInt(x) + parseInt(y)) % 2 == startingPosParity) answer += 1
  // }

  let answer = 0

  return answer
}

const main = async () => {
  const input = (await fetchInput()).split('\n')
  const inputExample = (await fetchExample()).split('\n')

  console.log('\nPart 1 (example):', withTime(() => solvePart1(inputExample, 6)))
  console.log('\nPart 1:', withTime(() => solvePart1(input, 64)))

  console.log('\nPart 2 (example):', withTime(() => solvePart2(inputExample, 6)))
  console.log('\nPart 2:', withTime(() => solvePart2(input, 1)))
}

main()
