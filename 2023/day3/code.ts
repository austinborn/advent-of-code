
import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { getSum, getMaxes } from '../../utils'

const main = async () => {
  console.log("Solving Puzzle:")
  const input = readFileSync('./2023/day3/input.txt', 'utf8')

  let rows = input.split('\n')

  const baseMapping = []
  for (let i = 0; i < rows.length; i++) {
    baseMapping.push([])
    for (let j = 0; j < rows[0].length; j++) {
      baseMapping[i].push(false)
    }
  }

  const baseGearsMapping = []
  for (let i = 0; i < rows.length; i++) {
    baseGearsMapping.push([])
    for (let j = 0; j < rows[0].length; j++) {
      baseGearsMapping[i].push({x:null,y:null})
    }
  }

  const { mapping: charTouchesSymbol, redNums: numberList, gears } = rows.reduce((reductions, r, rIdx) => {
    let numString = ""
    let startingIndex = { x: 0, y: 0 }
    let mapping = reductions.mapping
    let gears = reductions.gears
    let redNums = reductions.redNums
    for (let i = 0; i < r.length; i++) {
      if (r[i].match('[0-9]')) {
        if (numString == "") {
          startingIndex = { x: rIdx, y: i }
        }
        numString += r[i]

        continue
      }
      else if (r[i].match('\\.')) {
        if (numString != "") {
          redNums.push({ numString, startingIndex })
          numString = ''
        }
        continue
      }
      else if (r[i].match('\\*')) {
        if (numString != "") {
          redNums.push({ numString, startingIndex })
          numString = ''
        }
        if ((rIdx !== 0) && (i !== 0)) gears[rIdx - 1][i - 1] = {x: rIdx, y:i}
        if ((rIdx !== 0) && (i !== 0) && (i !== r.length)) gears[rIdx - 1][i] = {x: rIdx, y:i}
        if ((rIdx !== 0) && (i !== r.length)) gears[rIdx - 1][i + 1] = {x: rIdx, y:i}
        if (i !== 0) gears[rIdx ][i - 1] = {x: rIdx, y:i}
        if (i !== r.length) gears[rIdx ][i + 1] = {x: rIdx, y:i}
        if ((rIdx !== rows.length - 1) && (i !== 0)) gears[rIdx + 1][i - 1] = {x: rIdx, y:i}
        if ((rIdx !== rows.length - 1) && (i !== 0) && (i !== r.length)) gears[rIdx + 1][i] = {x: rIdx, y:i}
        if ((rIdx !== rows.length - 1) && (i !== r.length)) gears[rIdx + 1][i + 1] = {x: rIdx, y:i}

        continue
      }

      mapping[rIdx - 1][i - 1] ||= (rIdx !== 0) && (i !== 0)
      mapping[rIdx - 1][i] ||= (rIdx !== 0) && (i !== 0) && (i !== r.length)
      mapping[rIdx - 1][i + 1] ||= (rIdx !== 0) && (i !== r.length)
      mapping[rIdx ][i - 1] ||= (i !== 0)
      mapping[rIdx ][i + 1] ||= (i !== r.length)
      mapping[rIdx + 1][i - 1] ||= (rIdx !== rows.length - 1) && (i !== 0)
      mapping[rIdx + 1][i] ||= (rIdx !== rows.length - 1) && (i !== 0) && (i !== r.length)
      mapping[rIdx + 1][i + 1] ||= (rIdx !== rows.length - 1) && (i !== r.length)

      if (numString != "") {
        redNums.push({ numString, startingIndex })
        numString = ''
      }
    }

    if (numString != "") {
      redNums.push({ numString, startingIndex })
    }
    return { mapping: [...mapping], redNums: [...redNums], gears: [...gears] }
  }, { mapping: baseMapping, redNums: [], gears: baseGearsMapping })

  const gearTotals = numberList.reduce((gearTotals, number) => {
    const { numString, startingIndex } = number

    let includeGear = {x: null, y: null}
    for (let i = 0; i < numString.length; i++) {
      const gearLoc = gears[startingIndex.x][startingIndex.y + i]
      if (gearLoc.x != null && gearLoc.y != null) {
        includeGear = gearLoc
        break
      }
    }
    console.log({numString, includeGear})
    if(includeGear.x != null) {
      if (!gearTotals[`${includeGear.x}:${includeGear.y}`]) gearTotals[`${includeGear.x}:${includeGear.y}`] = []
      gearTotals[`${includeGear.x}:${includeGear.y}`].push(parseInt(numString))
    }
     return gearTotals
  }, {})

  const sum = Object.keys(gearTotals).reduce((sum, gear) => {
    const gearNums = gearTotals[gear]
    if (gearNums.length < 2) return sum
    let mult = 1
    for (let i = 0; i < gearNums.length; i++) {
      mult *= gearNums[i]
    }
    return sum + mult
  }, 0)
  
  // const sum = numberList.reduce((sum, number) => {
  //   const { numString, startingIndex } = number

  //   let includeNum = false
  //   for (let i = 0; i < numString.length; i++) {
  //     if (charTouchesSymbol[startingIndex.x][startingIndex.y + i]) {
  //       includeNum = true
  //       break
  //     }
  //   }
  //   console.log({numString, includeNum})
  //    return sum + (includeNum ? parseInt(numString) : 0)
  // }, 0)

  console.log("Answer 2: ", sum)
}

main()
