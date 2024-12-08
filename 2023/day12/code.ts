import { fetchExample, fetchInput, withTime } from '../../utils'

const copyString = (str: string, join: string, count: number) => {
  let newStr = str
  for (let i = 0; i < count; i++) {
    newStr += join + str
  }
  return newStr
}

const validConfigs = (hotSprings: boolean[], requireSpace: boolean, requireBroken: boolean, groups: number[]) => {
  if (hotSprings.length == 0) return groups.length == 0 ? 1 : 0
  let [thisHotSpring, ...remainingSprings] = hotSprings
  if (thisHotSpring) {
    if (requireSpace || groups.length == 0) return 0
    let newGroups = [...groups]
    newGroups[0] -= 1

    return newGroups[0] == 0
      ? validConfigs(remainingSprings, true, false, newGroups.slice(1))
      : validConfigs(remainingSprings, false, true, newGroups)
  }

  return thisHotSpring === false
    ? (requireBroken ? 0 : validConfigs(remainingSprings, false, false, groups))
    : (
      (requireSpace ? 0 : validConfigs([true, ...remainingSprings], false, false, groups)) +
      (requireBroken ? 0 : validConfigs([false, ...remainingSprings], false, false, groups))
    )
}

const solvePart1 = (rows: string[]) => {
  let answer = 0

  for (let row of rows) {
    const [hotSpringsStr, groupsStr] = row.split(' ')
    let groups = groupsStr.split(',').map(s => parseInt(s))
    let hotSprings = hotSpringsStr.split('').map(c => c == "#" ? true : c == '.' ? false : undefined)
    answer += validConfigs(hotSprings, false, false, groups)
  }

  return answer
}

const solvePart2 = (rows: string[]) => {
  let answer = 0

  for (let row of rows) {
    let start = Date.now()
    const [hotSpringsStr, groupsStr] = row.split(' ')
    let copiedGroups = copyString(groupsStr, ',', 4).split(',').map(s => parseInt(s))
    let copiedHotSprings = copyString(hotSpringsStr, '?', 4)
    let hotSprings = copiedHotSprings.split('').map(c => c == "#" ? true : c == '.' ? false : undefined)
    answer += validConfigs(hotSprings, false, false, copiedGroups)
  }

  return answer
}

const main = async () => {
  const input = (await fetchInput()).split('\n')
  const inputExample = (await fetchExample()).split('\n')

  console.log('\nPart 1 (example):', withTime(() => solvePart1(inputExample)))
  console.log('\nPart 1:', withTime(() => solvePart1(input)))

  console.log('\nPart 2 (example):', withTime(() => solvePart2(inputExample)))
  console.log('\nPart 2:', withTime(() => solvePart2(input))) // TODO Too slow, need to investigate other solutions
}

main()
