import { fetchExample, fetchInput, withTime } from '../../utils'

const getCurGroup = (forwardedTo: {}, group: string) => {
  while (forwardedTo[group] != undefined) group = forwardedTo[group]
  return group
}

const solvePart1 = (input: string[]) => {
  const plotNums: { a: number, p: number }[] = []

  const charGroup = {}
  const forwardedTo = {}

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[0].length; y++) {
      let char = input[x][y]
      let leftGroup, topGroup

      if (!charGroup[x]) charGroup[x] = {}

      if (y > 0 && input[x][y - 1] == char) {
        leftGroup = getCurGroup(forwardedTo, charGroup[x][y - 1])
      }
      if (x > 0 && input[x - 1][y] == char) {
        topGroup = getCurGroup(forwardedTo, charGroup[x - 1][y])
      }

      if (leftGroup != undefined && topGroup != undefined) {
        if (leftGroup != topGroup) {
          plotNums[leftGroup] = {
            a: plotNums[leftGroup].a + plotNums[topGroup].a,
            p: plotNums[leftGroup].p + plotNums[topGroup].p
          }
          plotNums[topGroup] = { a: 0, p: 0 }

          forwardedTo[topGroup] = leftGroup
        }

        charGroup[x][y] = leftGroup
        plotNums[leftGroup] = { a: plotNums[leftGroup].a + 1, p: plotNums[leftGroup].p }
      } else if (topGroup != undefined) {
        charGroup[x][y] = topGroup
        plotNums[topGroup] = { a: plotNums[topGroup].a + 1, p: plotNums[topGroup].p + 2 }
      } else if (leftGroup != undefined) {
        charGroup[x][y] = leftGroup
        plotNums[leftGroup] = { a: plotNums[leftGroup].a + 1, p: plotNums[leftGroup].p + 2 }
      } else {
        charGroup[x][y] = plotNums.length
        plotNums.push({ a: 1, p: 4 })
      }
    }
  }

  return plotNums.reduce((total, p) => total + p.a * p.p, 0)
}

const solvePart2 = (input: string[]) => {
  const plotNums: { a: number, s: number }[] = []

  const charGroup = {}
  const forwardedTo = {}

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[0].length; y++) {
      let char = input[x][y]
      let leftGroup, topGroup, topLeftGroup, topRightGroup

      if (!charGroup[x]) charGroup[x] = {}

      if (y > 0 && input[x][y - 1] == char) {
        leftGroup = getCurGroup(forwardedTo, charGroup[x][y - 1])
      }
      if (x > 0 && input[x - 1][y] == char) {
        topGroup = getCurGroup(forwardedTo, charGroup[x - 1][y])
      }
      if (x > 0 && y > 0 && input[x - 1][y - 1] == char) {
        topLeftGroup = getCurGroup(forwardedTo, charGroup[x - 1][y - 1])
      }
      if (x > 0 && y < input[0].length - 1 && input[x - 1][y + 1] == char) {
        topRightGroup = getCurGroup(forwardedTo, charGroup[x - 1][y + 1])
      }

      if (leftGroup != undefined && topGroup != undefined) {
        if (leftGroup != topGroup) {
          plotNums[leftGroup] = {
            a: plotNums[leftGroup].a + plotNums[topGroup].a,
            s: plotNums[leftGroup].s + plotNums[topGroup].s
          }
          plotNums[topGroup] = { a: 0, s: 0 }

          forwardedTo[topGroup] = leftGroup
        }

        charGroup[x][y] = leftGroup

        let deltaP = topRightGroup != undefined ? 0 : -2

        plotNums[leftGroup] = {
          a: plotNums[leftGroup].a + 1,
          s: plotNums[leftGroup].s + deltaP
        }
      } else if (topGroup != undefined) {
        charGroup[x][y] = topGroup

        let deltaP = (
          (topLeftGroup != undefined ? 2 : 0) +
          (topRightGroup != undefined ? 2 : 0)
        )

        plotNums[topGroup] = { a: plotNums[topGroup].a + 1, s: plotNums[topGroup].s + deltaP }
      } else if (leftGroup != undefined) {
        charGroup[x][y] = leftGroup

        let deltaP = topLeftGroup != undefined ? 2 : 0

        plotNums[leftGroup] = { a: plotNums[leftGroup].a + 1, s: plotNums[leftGroup].s + deltaP }
      } else {
        charGroup[x][y] = plotNums.length
        plotNums.push({ a: 1, s: 4 })
      }
    }
  }

  return plotNums.reduce((total, p) => total + p.a * p.s, 0)
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
