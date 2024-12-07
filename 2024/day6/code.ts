import { fetchExample, fetchInput } from '../../utils'

const getGuardXY = (map: string[][]) => {
  let x = 0, y = 0, found = false

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      let char = map[i][j]
      if (char == '^') {
        x = i
        y = j
        found = true
        break
      }
    }
    if (found) break
  }

  return {x,y}
}


const solvePart1 = (rows: string[]) => {

  const map = rows.map(r => r.split(''))

  let {x, y} = getGuardXY(map)

  let guardDir = 'up'
  let nextchar
  let answer = 1
  let traversed = rows.map(r => r.split('').map(_ => false))
  traversed[x][y] = true

  while(true) {
    if (guardDir == 'up') {
      if (x == 0) break
      nextchar = map[x-1][y]
      if (nextchar == '#') {
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
      nextchar = map[x][y-1]
      if (nextchar == '#') {
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
      nextchar = map[x+1][y]
      if (nextchar == '#') {
        guardDir = 'left'
      } else {
        x += 1
        if (!traversed[x][y]) {
          traversed[x][y] = true
          answer += 1
        }
      }
    } else if (guardDir == 'right') {
      if (y == map.length - 1) break
      nextchar = map[x][y+1]
      if (nextchar == '#') {
        guardDir = 'down'
      } else {
        y += 1
        if (!traversed[x][y]) {
          traversed[x][y] = true
          answer += 1
        }
      }
    } else {
      console.log("NO OP")
      break
    }
  }

  return answer
}

const solvePart2 = (rows: string[]) => {
  const map = rows.map(r => r.split(''))

  let {x, y} = getGuardXY(map)

  let allObsPositions: Set<string> = new Set()
  let guardDir = 'up'
  let nextchar

  while(true) {
    if (guardDir == 'up') {
      if (x == 0) break
      nextchar = map[x-1][y]
      if (nextchar == '#') {
        guardDir = 'right'
      } else {
        x -= 1
        allObsPositions.add(x+','+y)
      }
    } else if (guardDir == 'left') {
      if (y == 0) break
      nextchar = map[x][y-1]
      if (nextchar == '#') {
        guardDir = 'up'
      } else {
        y -= 1
        allObsPositions.add(x+','+y)
      }
    } else if (guardDir == 'down') {
      if (x == map.length - 1) break
      nextchar = map[x+1][y]
      if (nextchar == '#') {
        guardDir = 'left'
      } else {
        x += 1
        allObsPositions.add(x+','+y)
      }
    } else { // guardDir == 'right'
      if (y == map.length - 1) break
      nextchar = map[x][y+1]
      if (nextchar == '#') {
        guardDir = 'down'
      } else {
        y += 1
        allObsPositions.add(x+','+y)
      }
    }
  }

  let answer = 0

  for (let obsPos of allObsPositions) {
    let [obsX, obsY] = obsPos.split(',')
    let newMap = [...map.map(row => [...row])]
    newMap[obsX][obsY] = '#'

    guardDir = 'up'
    nextchar = ''
  
    let {x, y} = getGuardXY(map)

    let traversedDir: Set<string>[][] = newMap.map(r => r.map(_ => new Set()))

    while(true) {
      if (guardDir == 'up') {
        if (x == 0) break
        if (traversedDir[x][y].has('up')) {
          answer += 1
          break
        } else traversedDir[x][y].add('up')
        nextchar = newMap[x-1][y]
        if (nextchar == '#') {
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
        nextchar = newMap[x][y-1]
        if (nextchar == '#') {
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
        nextchar = newMap[x+1][y]
        if (nextchar == '#') {
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
        nextchar = newMap[x][y+1]
        if (nextchar == '#') {
          guardDir = 'down'
        } else {
          y += 1
        }
      }
    }
  }

  return answer
}

const main = async () => {
  const input = (await fetchInput()).split('\n')
  const inputExample = (await fetchExample()).split('\n')

  console.log('\nPart 1 (example):', solvePart1(inputExample))
  console.log('\nPart 1:', solvePart1(input))

  console.log('\nPart 2 (example):', solvePart2(inputExample))
  console.log('\nPart 2:', solvePart2(input))
}

main()
