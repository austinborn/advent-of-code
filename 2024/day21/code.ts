import { fetchExample, fetchInput, withTime } from '../../utils'

const getPermutations = (str: string) => {
  let allStr = []

  const permute = (charsLeft: string[], totalStr: string) => {
    if (charsLeft.length == 0) allStr.push(totalStr)
    else {
      for (let i = 0; i < charsLeft.length; i++) {
        let newCharsLeft = [...charsLeft]
        let char = newCharsLeft.splice(i, 1)[0]
        permute(newCharsLeft, char + totalStr)
      }
    }
  }

  permute(str.split(''), "")

  return [...new Set(allStr)]
}

const getDirSeqs = (buttonFromCoord: number[], buttonToCoord: number[]) => {
  let seq = ""
  if (buttonToCoord[1] < buttonFromCoord[1]) seq += "^".repeat(buttonFromCoord[1] - buttonToCoord[1])
  if (buttonToCoord[0] > buttonFromCoord[0]) seq += ">".repeat(buttonToCoord[0] - buttonFromCoord[0])
  if (buttonToCoord[1] > buttonFromCoord[1]) seq += "v".repeat(buttonToCoord[1] - buttonFromCoord[1])
  if (buttonToCoord[0] < buttonFromCoord[0]) seq += "<".repeat(buttonFromCoord[0] - buttonToCoord[0])
  return getPermutations(seq).map(s => s + "A")
}

const pathAvoidsSpace = (coord: number[], space: number[], path: string) => {
  for (let dir of path) {
    if (dir == "^") coord[1] = coord[1] - 1
    else if (dir == "v") coord[1] = coord[1] + 1
    else if (dir == "<") coord[0] = coord[0] - 1
    else if (dir == ">") coord[0] = coord[0] + 1
    if (coord[0] == space[0] && coord[1] == space[1]) return false
  }
  return true
}

const numPadSquares = {
  "7": [0, 0], "8": [1, 0], "9": [2, 0],
  "4": [0, 1], "5": [1, 1], "6": [2, 1],
  "1": [0, 2], "2": [1, 2], "3": [2, 2],
  "0": [1, 3], "A": [2, 3],
}
const numPadKeys = Object.keys(numPadSquares)

const dirPadSquares = {
  "^": [1, 0], "A": [2, 0],
  "<": [0, 1], "v": [1, 1], ">": [2, 1],
}
const dirPadKeys = Object.keys(dirPadSquares)

const dirPadSeq: { [buttonFrom: string]: { [buttonTo: string]: string[] } } = {}
for (let buttonFrom of dirPadKeys) {
  dirPadSeq[buttonFrom] = {}
  for (let buttonTo of dirPadKeys) {
    const allSeq = getDirSeqs(dirPadSquares[buttonFrom], dirPadSquares[buttonTo])
    dirPadSeq[buttonFrom][buttonTo] = allSeq.filter(s => pathAvoidsSpace([...dirPadSquares[buttonFrom]], [0, 0], s))
  }
}

const numPadSeq: { [buttonFrom: string]: { [buttonTo: string]: string[] } } = {}
for (let buttonFrom of numPadKeys) {
  numPadSeq[buttonFrom] = {}
  for (let buttonTo of numPadKeys) {
    const allSeq = getDirSeqs(numPadSquares[buttonFrom], numPadSquares[buttonTo])
    numPadSeq[buttonFrom][buttonTo] = allSeq.filter(s => pathAvoidsSpace([...numPadSquares[buttonFrom]], [0, 3], s))
  }
}

const getSmallestLenCache = {}
const getSmallestLen = (buttonFrom: string, buttonTo: string, layer: number) => {
  if (getSmallestLenCache[`${buttonFrom}${buttonTo}${layer}`] != undefined) return getSmallestLenCache[`${buttonFrom}${buttonTo}${layer}`]

  let allSeqs = (dirPadKeys.includes(buttonFrom) && dirPadKeys.includes(buttonTo))
    ? dirPadSeq[buttonFrom][buttonTo]
    : numPadSeq[buttonFrom][buttonTo]

  let lengths = []
  if (layer == 0) lengths = allSeqs.map(s => s.length)
  else {
    for (let seq of allSeqs) {
      let curButton: string = "A"
      let len = 0
      for (let nextButton of seq) {
        len += getSmallestLen(curButton, nextButton, layer - 1)
        curButton = nextButton
      }
      lengths.push(len)
    }
  }

  getSmallestLenCache[`${buttonFrom}${buttonTo}${layer}`] = Math.min(...lengths)
  return getSmallestLenCache[`${buttonFrom}${buttonTo}${layer}`]
}

const solvePart = (input: string[], intermediateBots: number) => {
  let answer = 0
  for (let code of input) {

    let curButton: string = "A"
    let len = 0
    for (let nextButton of code.split('')) {
      len += getSmallestLen(curButton, nextButton, intermediateBots)
      curButton = nextButton
    }

    answer += len * parseInt(code.slice(0, 3))
  }

  return answer
}

const main = async () => {
  const input = (await fetchInput()).split('\n')
  const inputExample = (await fetchExample()).split('\n')

  console.log('\nPart 1 (example):', withTime(() => solvePart(inputExample, 2)))
  console.log('\nPart 1:', withTime(() => solvePart(input, 2)))
  console.log('\nPart 2:', withTime(() => solvePart(input, 25)))
}

main()
