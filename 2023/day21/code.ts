import { fetchExample, fetchInput, getSum, withTime } from '../../utils'

const getStartingPos = (rows: string[]) => {
  for (let x = 0; x < rows.length; x++) {
    for (let y = 0; y < rows[0].length; y++) {
      if (rows[x][y] == 'S') return { x, y }
    }
  }

  return { x: 0, y: 0 }
}

const getParity = (nums: number[]) => (
  getSum(nums) < 0 ? (-getSum(nums) % 2) : (getSum(nums) % 2)
)

const getPosCount = (i: number, single: number, l1: number, l2: number) => (
  single+l1*Math.ceil(i/2)**2+l2*(Math.floor(i/2)+1)*Math.floor(i/2)/2
)

let modCacheX = {}
let modCacheY = {}

const resetCaches = () => {
  modCacheX = {}
  modCacheY = {}
}

const updateCacheX = (x: number, max: number) => {
  if (!modCacheX[x]) modCacheX[x] = ((x % max) + max) % max
}

const updateCacheY = (y: number, max: number) => {
  if (!modCacheY[y]) modCacheY[y] = ((y % max) + max) % max
}

const solve = (rows: string[], steps: number, flipParity: boolean = false) => {
  let answer = 0

  const { x, y } = getStartingPos(rows)
  rows[x] = rows[x].split('S').join('.')

  modCacheX[x] = x
  modCacheY[y] = y

  const startParity = getParity([x, y])

  let validPos = new Set<string>()
  validPos.add(`${x},${y}`)

  let leadingPos =[{x, y}]
  validPos.add(`${x},${y}`)

  for (let i = 1; i <= steps; i++) {
    let nextLeadingPos = []
    for (let pos of leadingPos) {
      let {x: posX, y: posY } = pos
      updateCacheX(posX-1, rows.length)
      updateCacheX(posX+1, rows.length)
      updateCacheY(posY-1, rows[0].length)
      updateCacheY(posY+1, rows[0].length)

      if (
        rows[modCacheX[posX-1]][modCacheY[posY]] == '.' &&
        !validPos.has(`${posX-1},${posY}`)
      ) {
        validPos.add(`${posX-1},${posY}`)
        nextLeadingPos.push({ x: posX-1, y: posY })
      }

      if (
        rows[modCacheX[posX+1]][modCacheY[posY]] == '.' &&
        !validPos.has(`${posX+1},${posY}`)
      ) {
        validPos.add(`${posX+1},${posY}`)
        nextLeadingPos.push({ x: posX+1, y: posY })
      }

      if (
        rows[modCacheX[posX]][modCacheY[posY-1]] == '.' &&
        !validPos.has(`${posX},${posY-1}`)
      ) {
        validPos.add(`${posX},${posY-1}`)
        nextLeadingPos.push({ x: posX, y: posY-1 })
      }

      if (
        rows[modCacheX[posX]][modCacheY[posY+1]] == '.' &&
        !validPos.has(`${posX},${posY+1}`)
      ) {
        validPos.add(`${posX},${posY+1}`)
        nextLeadingPos.push({ x: posX, y: posY+1 })
      }
    }

    leadingPos = nextLeadingPos
  }

  for (let pos of validPos) {
    let [x, y] = pos.split(',').map(c => parseInt(c))
    if (
      !getParity([x, y, startParity, flipParity ? 1 : 0]) //Same parity
    ) answer += 1
  }

  const splitRow = rows[x].split('')
  splitRow[y] = 'S'
  rows[x] = splitRow.join('')

  return answer
}

const main = async () => {
  const input = (await fetchInput()).split('\n')
  const inputExample = (await fetchExample()).split('\n')

  console.log('\nPart 1 (example):', withTime(() => solve(inputExample, 6)))
  resetCaches()

  console.log('\nPart 1:', withTime(() => solve(input, 64)))
  resetCaches()

  console.log('\nPart 2 (example):', withTime(() => solve(inputExample, 500)))
  resetCaches()

  let WIDTH = 131
  let HALFWIDTH = Math.floor(WIDTH / 2)
  let PROBLEM_LAYERS = (26501365 - HALFWIDTH) / WIDTH

  let answers = []
  for (let layer = 0; layer < 3; layer++){
    answers.push(solve(input, HALFWIDTH + layer * WIDTH, true))
  }

  const centralDiamond = answers[0]
  const layer1 = answers[1] - answers[0]
  const layer2 = answers[2] - answers[1]

  console.log('\nPart 2:', withTime(() => getPosCount(PROBLEM_LAYERS, centralDiamond, layer1, layer2)))
}

main()
