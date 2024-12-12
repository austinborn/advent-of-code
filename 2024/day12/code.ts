import { fetchExample, fetchInput, withTime } from '../../utils'

const getCurrentGroup = (forwardedTo: {}, group: string) => {
  while (forwardedTo[group] != undefined) group = forwardedTo[group]
  return group
}

const solvePart1 = (input: string[]) => {
  const groupStats: { a: number, p: number }[] = []

  const groupMap = {}
  const forwardedTo = {}

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[0].length; y++) {
      let char = input[x][y]
      let leftGroup, topGroup

      if (!groupMap[x]) groupMap[x] = {}

      if (y > 0 && input[x][y - 1] == char) {
        leftGroup = getCurrentGroup(forwardedTo, groupMap[x][y - 1])
      }
      if (x > 0 && input[x - 1][y] == char) {
        topGroup = getCurrentGroup(forwardedTo, groupMap[x - 1][y])
      }

      if (leftGroup != undefined && topGroup != undefined) {
        if (leftGroup != topGroup) {
          groupStats[leftGroup] = {
            a: groupStats[leftGroup].a + groupStats[topGroup].a,
            p: groupStats[leftGroup].p + groupStats[topGroup].p
          }
          groupStats[topGroup] = { a: 0, p: 0 }

          forwardedTo[topGroup] = leftGroup
        }

        groupMap[x][y] = leftGroup
        groupStats[leftGroup] = { a: groupStats[leftGroup].a + 1, p: groupStats[leftGroup].p }
      } else if (topGroup != undefined) {
        groupMap[x][y] = topGroup
        groupStats[topGroup] = { a: groupStats[topGroup].a + 1, p: groupStats[topGroup].p + 2 }
      } else if (leftGroup != undefined) {
        groupMap[x][y] = leftGroup
        groupStats[leftGroup] = { a: groupStats[leftGroup].a + 1, p: groupStats[leftGroup].p + 2 }
      } else {
        groupMap[x][y] = groupStats.length
        groupStats.push({ a: 1, p: 4 })
      }
    }
  }

  return groupStats.reduce((total, p) => total + p.a * p.p, 0)
}

const solvePart2 = (input: string[]) => {
  const groupStats: { a: number, s: number }[] = []

  const groupMap = {}
  const forwardedTo = {}

  for (let x = 0; x < input.length; x++) {
    for (let y = 0; y < input[0].length; y++) {
      let char = input[x][y]
      let leftGroup, topGroup, topLeftGroup, topRightGroup

      if (!groupMap[x]) groupMap[x] = {}

      if (y > 0 && input[x][y - 1] == char) {
        leftGroup = getCurrentGroup(forwardedTo, groupMap[x][y - 1])
      }
      if (x > 0 && input[x - 1][y] == char) {
        topGroup = getCurrentGroup(forwardedTo, groupMap[x - 1][y])
      }
      if (x > 0 && y > 0 && input[x - 1][y - 1] == char) {
        topLeftGroup = getCurrentGroup(forwardedTo, groupMap[x - 1][y - 1])
      }
      if (x > 0 && y < input[0].length - 1 && input[x - 1][y + 1] == char) {
        topRightGroup = getCurrentGroup(forwardedTo, groupMap[x - 1][y + 1])
      }

      if (leftGroup != undefined && topGroup != undefined) {
        if (leftGroup != topGroup) {
          groupStats[leftGroup] = {
            a: groupStats[leftGroup].a + groupStats[topGroup].a,
            s: groupStats[leftGroup].s + groupStats[topGroup].s
          }
          groupStats[topGroup] = { a: 0, s: 0 }

          forwardedTo[topGroup] = leftGroup
        }

        groupMap[x][y] = leftGroup

        let deltaP = topRightGroup != undefined ? 0 : -2

        groupStats[leftGroup] = {
          a: groupStats[leftGroup].a + 1,
          s: groupStats[leftGroup].s + deltaP
        }
      } else if (topGroup != undefined) {
        groupMap[x][y] = topGroup

        let deltaP = (
          (topLeftGroup != undefined ? 2 : 0) +
          (topRightGroup != undefined ? 2 : 0)
        )

        groupStats[topGroup] = { a: groupStats[topGroup].a + 1, s: groupStats[topGroup].s + deltaP }
      } else if (leftGroup != undefined) {
        groupMap[x][y] = leftGroup

        let deltaP = topLeftGroup != undefined ? 2 : 0

        groupStats[leftGroup] = { a: groupStats[leftGroup].a + 1, s: groupStats[leftGroup].s + deltaP }
      } else {
        groupMap[x][y] = groupStats.length
        groupStats.push({ a: 1, s: 4 })
      }
    }
  }

  return groupStats.reduce((total, p) => total + p.a * p.s, 0)
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
