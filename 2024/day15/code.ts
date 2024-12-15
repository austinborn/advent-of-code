import { fetchExample, fetchInput, withTime } from '../../utils'

const WALL = '#'
const BOX = "O"
const ROBOT = '@'
const SPACE = '.'
const BOXL = '['
const BOXR = ']'
const UP = '^'
const DOWN = 'v'
const LEFT = '<'
const RIGHT = '>'

const replaceChar = (str: string, index: number, char: string) => str.substring(0, index) + char + str.substring(index + char.length)

const solvePart1 = (input: string) => {
  const [mapStr, actionsStr] = input.split('\n\n')

  const map = mapStr.split('\n')

  let robot: { x: number, y: number }

  let boxes = new Set<string>()

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] == ROBOT) {
        robot = { x: j, y: i }
        map[i] = replaceChar(map[i], j, SPACE)
      } else if (map[i][j] == BOX) {
        boxes.add(`${j}-${i}`)
      }
    }
  }

  let actions = actionsStr.split('')

  let check: { x: number, y: number }
  let nextChar: string
  let boxesToMove: string[]
  let canMoveBoxes: boolean

  for (let action of actions) {
    boxesToMove = []
    canMoveBoxes = false
    if (action == UP) {
      check = { x: robot.x, y: robot.y - 1 }
      nextChar = map[check.y][check.x]
      while (nextChar != WALL) {
        if (nextChar == BOX) {
          boxesToMove.push(`${check.x}-${check.y}`)
          check = { x: check.x, y: check.y - 1 }
          nextChar = map[check.y][check.x]
        } else {
          canMoveBoxes = true
          break
        }
      }
    } else if (action == RIGHT) {
      check = { x: robot.x + 1, y: robot.y }
      nextChar = map[check.y][check.x]
      while (nextChar != WALL) {
        if (nextChar == BOX) {
          boxesToMove.push(`${check.x}-${check.y}`)
          check = { x: check.x + 1, y: check.y }
          nextChar = map[check.y][check.x]
        } else {
          canMoveBoxes = true
          break
        }
      }
    } else if (action == LEFT) {
      check = { x: robot.x - 1, y: robot.y }
      nextChar = map[check.y][check.x]
      while (nextChar != WALL) {
        if (nextChar == BOX) {
          boxesToMove.push(`${check.x}-${check.y}`)
          check = { x: check.x - 1, y: check.y }
          nextChar = map[check.y][check.x]
        } else {
          canMoveBoxes = true
          break
        }
      }
    } else if (action == DOWN) {
      check = { x: robot.x, y: robot.y + 1 }
      nextChar = map[check.y][check.x]
      while (nextChar != WALL) {
        if (nextChar == BOX) {
          boxesToMove.push(`${check.x}-${check.y}`)
          check = { x: check.x, y: check.y + 1 }
          nextChar = map[check.y][check.x]
        } else {
          canMoveBoxes = true
          break
        }
      }
    }
    if (canMoveBoxes) {
      if (action == RIGHT) {
        robot = { x: robot.x + 1, y: robot.y }
        for (let box of boxesToMove.reverse()) {
          const [x,y] = box.split('-').map(c => parseInt(c))
          boxes.delete(box)
          boxes.add(`${x+1}-${y}`)
          map[y] = replaceChar(map[y], x, SPACE)
          map[y] = replaceChar(map[y], x+1, BOX)
        }
      } else if (action == LEFT) {
        robot = { x: robot.x - 1, y: robot.y }
        for (let box of boxesToMove.reverse()) {
          const [x,y] = box.split('-').map(c => parseInt(c))
          boxes.delete(box)
          boxes.add(`${x-1}-${y}`)
          map[y] = replaceChar(map[y], x, SPACE)
          map[y] = replaceChar(map[y], x-1, BOX)
        }
      } else if (action == UP) {
        robot = { x: robot.x, y: robot.y - 1 }
        for (let box of boxesToMove.reverse()) {
          const [x,y] = box.split('-').map(c => parseInt(c))
          boxes.delete(box)
          boxes.add(`${x}-${y-1}`)
          map[y] = replaceChar(map[y], x, SPACE)
          map[y-1] = replaceChar(map[y-1], x, BOX)
        }
      } else if (action == DOWN)  {
        robot = { x: robot.x, y: robot.y + 1 }
        for (let box of boxesToMove.reverse()) {
          const [x,y] = box.split('-').map(c => parseInt(c))
          boxes.delete(box)
          boxes.add(`${x}-${y+1}`)
          map[y] = replaceChar(map[y], x, SPACE)
          map[y+1] = replaceChar(map[y+1], x, BOX)
        }
      }
    }
  }

  let answer = 0
  for (let box of boxes.values()) {
    const [x,y] = box.split('-').map(c => parseInt(c))
    answer += 100 * y + x
  }

  return answer
}

const solvePart2 = (input: string) => {
  const [mapStr, actionsStr] = input.split('\n\n')

  const map = mapStr.split('\n')

  let robot: { x: number, y: number }

  let boxes = new Set<string>()

  let bigMapStr: string[][] = []

  const bigMapConvert = {
    [ROBOT]: ROBOT + SPACE,
    [BOX]: BOXL + BOXR,
    [SPACE]: SPACE + SPACE,
    [WALL]: WALL + WALL
  }

  for (let i = 0; i < map.length; i++) {
    bigMapStr.push([])
    for (let j = 0; j < map[0].length; j++) bigMapStr[i].push(bigMapConvert[map[i][j]])
  }

  let bigMap = bigMapStr.map(r => r.join(''))

  for (let i = 0; i < bigMap.length; i++) {
    for (let j = 0; j < bigMap[0].length; j++) {
      if (bigMap[i][j] == ROBOT) {
        robot = { x: j, y: i }
        bigMap[i] = replaceChar(bigMap[i], j, SPACE)
      } else if (bigMap[i][j] == BOXL) {
        boxes.add(`${j}-${i}`)
      }
    }
  }

  let actions = actionsStr.split('')

  let spacesToCheck: { x: number, y: number }[]
  let nextChar: string
  let boxesToMove: Set<string>
  let hinderanceFound: boolean
  let check: { x: number, y: number }

  for (let action of actions) {
    boxesToMove = new Set()
    spacesToCheck = []
    hinderanceFound = false
    if (action == UP) {
      spacesToCheck.push({ x: robot.x, y: robot.y - 1 })
      while (spacesToCheck.length) {
        check = spacesToCheck.shift()
        nextChar = bigMap[check.y][check.x]
        if (nextChar == BOXL) {
          boxesToMove.add(`${check.x}-${check.y}`)
          spacesToCheck.push({ x: check.x, y: check.y - 1 })
          spacesToCheck.push({ x: check.x + 1, y: check.y - 1 })
        } else if (nextChar == BOXR) {
          boxesToMove.add(`${check.x-1}-${check.y}`)
          spacesToCheck.push({ x: check.x, y: check.y - 1 })
          spacesToCheck.push({ x: check.x - 1, y: check.y - 1 })
        } else if (nextChar == WALL) {
          hinderanceFound = true
          break
        }
      }
    } else if (action == DOWN) {
      spacesToCheck.push({ x: robot.x, y: robot.y + 1 })
      while (spacesToCheck.length) {
        check = spacesToCheck.shift()
        nextChar = bigMap[check.y][check.x]
        if (nextChar == BOXL) {
          boxesToMove.add(`${check.x}-${check.y}`)
          spacesToCheck.push({ x: check.x, y: check.y + 1 })
          spacesToCheck.push({ x: check.x + 1, y: check.y + 1 })
        } else if (nextChar == BOXR) {
          boxesToMove.add(`${check.x-1}-${check.y}`)
          spacesToCheck.push({ x: check.x, y: check.y + 1 })
          spacesToCheck.push({ x: check.x - 1, y: check.y + 1 })
        } else if (nextChar == WALL) {
          hinderanceFound = true
          break
        }
      }
    } else if (action == RIGHT) {
      spacesToCheck.push({ x: robot.x + 1, y: robot.y })
      while (spacesToCheck.length) {
        check = spacesToCheck.shift()
        nextChar = bigMap[check.y][check.x]
        if (nextChar == BOXL) {
          boxesToMove.add(`${check.x}-${check.y}`)
          spacesToCheck.push({ x: check.x + 2, y: check.y })
        } else if (nextChar == WALL) {
          hinderanceFound = true
          break
        }
      }
    } else if (action == LEFT) {
      spacesToCheck.push({ x: robot.x - 1, y: robot.y })
      while (spacesToCheck.length) {
        check = spacesToCheck.shift()
        nextChar = bigMap[check.y][check.x]
        if (nextChar == BOXR) {
          boxesToMove.add(`${check.x-1}-${check.y}`)
          spacesToCheck.push({ x: check.x - 2, y: check.y })
        } else if (nextChar == WALL) {
          hinderanceFound = true
          break
        }
      }
    } 

    if (!hinderanceFound) {
      let unsortedSet = boxesToMove.values()
      let boxSet: string[] = []
      for (let unsortedBox of unsortedSet) boxSet.push(unsortedBox)

      if (action == RIGHT) {
        robot = { x: robot.x + 1, y: robot.y }
        boxSet.sort((a, b) => parseInt(b.split('-')[0]) - parseInt(a.split('-')[0]))
        for (let box of boxSet) {
          const [x,y] = box.split('-').map(c => parseInt(c))
          boxes.delete(box)
          boxes.add(`${x+1}-${y}`)
          bigMap[y] = replaceChar(bigMap[y], x, SPACE + BOXL + BOXR)
        }
      } else if (action == LEFT) {
        robot = { x: robot.x - 1, y: robot.y }
        boxSet.sort((a, b) => parseInt(a.split('-')[0]) - parseInt(b.split('-')[0]))
        for (let box of boxSet) {
          const [x,y] = box.split('-').map(c => parseInt(c))
          boxes.delete(box)
          boxes.add(`${x-1}-${y}`)
          bigMap[y] = replaceChar(bigMap[y], x-1, BOXL + BOXR + SPACE)
        }
      } else if (action == UP) {
        robot = { x: robot.x, y: robot.y - 1 }
        boxSet.sort((a, b) => parseInt(a.split('-')[1]) - parseInt(b.split('-')[1]))
        for (let box of boxSet) {
          const [x,y] = box.split('-').map(c => parseInt(c))
          boxes.delete(box)
          boxes.add(`${x}-${y-1}`)
          bigMap[y] = replaceChar(bigMap[y], x, SPACE + SPACE)
          bigMap[y-1] = replaceChar(bigMap[y-1], x, BOXL + BOXR)
        }
      } else if (action == DOWN)  {
        robot = { x: robot.x, y: robot.y + 1 }
        boxSet.sort((a, b) => parseInt(b.split('-')[1]) - parseInt(a.split('-')[1]))
        for (let box of boxSet) {
          const [x,y] = box.split('-').map(c => parseInt(c))
          boxes.delete(box)
          boxes.add(`${x}-${y+1}`)
          bigMap[y] = replaceChar(bigMap[y], x, SPACE + SPACE)
          bigMap[y+1] = replaceChar(bigMap[y+1], x, BOXL + BOXR)
        }
      }
    }
  }

  let answer = 0
  for (let box of boxes.values()) {
    const [x,y] = box.split('-').map(c => parseInt(c))
    answer += 100 * y + x
  }

  return answer
}

const main = async () => {
  const input = (await fetchInput())
  const inputExample = (await fetchExample())

  console.log('\nPart 1 (example):', withTime(() => solvePart1(inputExample)))
  console.log('\nPart 1:', withTime(() => solvePart1(input)))

  console.log('\nPart 2 (example):', withTime(() => solvePart2(inputExample)))
  console.log('\nPart 2:', withTime(() => solvePart2(input)))
}

main()
