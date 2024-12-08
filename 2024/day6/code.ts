import { fetchExample, fetchInput, getFilledMatrix, withTime } from '../../utils'

const getGuardXY = (map: string[][]) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] == '^') return { x: i, y: j }
    }
  }

  return { x: 0, y: 0 }
}

const solvePart1 = (rows: string[]) => {

  const map = rows.map(r => r.split(''))

  let {x, y} = getGuardXY(map)

  let guardDir = 'up'
  let answer = 1
  let traversed = getFilledMatrix([rows.length, rows[0].length], () => false)
  traversed[x][y] = true

  while(true) {
    if (guardDir == 'up') {
      if (x == 0) break
      if (map[x-1][y] == '#') {
        guardDir = 'right'
      } else {
        x -= 1
        if (!traversed[x][y]) {
          traversed[x][y] = true
          answer += 1
        }
      }
    } else if (guardDir == 'left') {
      if (y == 0) break
      if (map[x][y-1] == '#') {
        guardDir = 'up'
      } else {
        y -= 1
        if (!traversed[x][y]) {
          traversed[x][y] = true
          answer += 1
        }
      }
    } else if (guardDir == 'down') {
      if (x == map.length - 1) break
      if (map[x+1][y] == '#') {
        guardDir = 'left'
      } else {
        x += 1
        if (!traversed[x][y]) {
          traversed[x][y] = true
          answer += 1
        }
      }
    } else { // guardDir == 'right'
      if (y == map.length - 1) break
      if (map[x][y+1] == '#') {
        guardDir = 'down'
      } else {
        y += 1
        if (!traversed[x][y]) {
          traversed[x][y] = true
          answer += 1
        }
      }
    }
  }

  return answer
}

const solvePart2 = (rows: string[]) => {
  const map = rows.map(r => r.split(''))

  let {x, y} = getGuardXY(map)

  let allObsPositions: Set<string> = new Set()
  let guardDir = 'up'

  while(true) {
    if (guardDir == 'up') {
      if (x == 0) break
      if (map[x-1][y] == '#') {
        guardDir = 'right'
      } else {
        x -= 1
        allObsPositions.add(x+','+y)
      }
    } else if (guardDir == 'left') {
      if (y == 0) break
      if (map[x][y-1] == '#') {
        guardDir = 'up'
      } else {
        y -= 1
        allObsPositions.add(x+','+y)
      }
    } else if (guardDir == 'down') {
      if (x == map.length - 1) break
      if (map[x+1][y] == '#') {
        guardDir = 'left'
      } else {
        x += 1
        allObsPositions.add(x+','+y)
      }
    } else { // guardDir == 'right'
      if (y == map.length - 1) break
      if (map[x][y+1] == '#') {
        guardDir = 'down'
      } else {
        y += 1
        allObsPositions.add(x+','+y)
      }
    }
  }

  let answer = 0

  let guardXY = getGuardXY(map)

  for (let obsPos of allObsPositions) {
    let [obsX, obsY] = obsPos.split(',')
    map[obsX][obsY] = '#'

    guardDir = 'up'

    let {x, y} = guardXY

    let traversedDir = getFilledMatrix([map.length, map[0].length], () => new Set())

    while(true) {
      if (guardDir == 'up') {
        if (x == 0) break
        if (traversedDir[x][y].has('up')) {
          answer += 1
          break
        } else traversedDir[x][y].add('up')
        if (map[x-1][y] == '#') {
          guardDir = 'right'
        } else {
          x -= 1
        }
      } else if (guardDir == 'left') {
        if (y == 0) break
        if (traversedDir[x][y].has('left')) {
          answer += 1
          break
        } else traversedDir[x][y].add('left')
        if (map[x][y-1] == '#') {
          guardDir = 'up'
        } else {
          y -= 1
        }
      } else if (guardDir == 'down') {
        if (x == map.length - 1) break
        if (traversedDir[x][y].has('down')) {
          answer += 1
          break
        } else traversedDir[x][y].add('down')
        if (map[x+1][y] == '#') {
          guardDir = 'left'
        } else {
          x += 1
        }
      } else { // guardDir == 'right'
        if (y == map.length - 1) break
        if (traversedDir[x][y].has('right')) {
          answer += 1
          break
        } else traversedDir[x][y].add('right')
        if (map[x][y+1] == '#') {
          guardDir = 'down'
        } else {
          y += 1
        }
      }
    }
    map[obsX][obsY] = '.'
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
