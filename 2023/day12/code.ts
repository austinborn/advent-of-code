import { fetchExample, fetchInput, withTime } from '../../utils'

let cache: Record<string, number> = {}

const copyString = (str: string, join: string, count: number) => {
  let newStr = str
  for (let i = 0; i < count; i++) {
    newStr += join + str
  }
  return newStr
}

const charToInput = (c: string) => c == "#" ? true : c == '.' ? false : undefined

const charsToTypeList = (c: string) => c.split('').reduce<{ type: Boolean, length: number }[]>((list, c) => {
  let type = charToInput(c)
  if (!list.length) list.push({ type, length: 1 })
  else {
    const lastSet = list.pop()
    if (lastSet.type === type) {
      list.push({ type: lastSet.type, length: lastSet.length + 1 })
    } else {
      list.push(lastSet)
      list.push({ type, length: 1 })
    }
  }
  return list
}, [])

const getCacheKey = (hotSprings: { type: Boolean, length: number }[], requireSpace: boolean, requireBroken: boolean, groups: number[]) => {
  return `${
    hotSprings.map(b => (b.type ? "#" : (b.type === false ? "." : "?")).repeat(b.length))
  }|${
    requireSpace ? "T": "F"
  }|${
    requireBroken ? "T": "F"
  }|${
    groups.map(g => g.toString()).join(",")
  }`
}

const validConfigs = (hotSprings: { type: Boolean, length: number }[], requireSpace: boolean, requireBroken: boolean, groups: number[]) => {
  if (hotSprings.length == 0) return groups.length == 0 ? 1 : 0

  let key = getCacheKey(hotSprings, requireSpace, requireBroken, groups)
  if (cache[key] !== undefined) return cache[key]

  let val = 0

  let [thisHotSpringSet, ...remainingSprings] = hotSprings
  if (thisHotSpringSet.type) {
    if (requireSpace || groups.length == 0 || groups[0] < thisHotSpringSet.length) {
      val = 0
    } else {
      let newGroups = [...groups]
      newGroups[0] -= thisHotSpringSet.length
  
      val = newGroups[0] == 0
        ? validConfigs(remainingSprings, true, false, newGroups.slice(1))
        : validConfigs(remainingSprings, false, true, newGroups)
    }
  } else if (thisHotSpringSet.type === false) {
    val = requireBroken
      ? 0
      : validConfigs(remainingSprings, false, false, groups)
  } else {
    if (groups.length == 0) {
      val = validConfigs(remainingSprings, true, false, groups)
    } else {
      let newSet = [{ type: undefined, length: thisHotSpringSet.length - 1 }]
      if (newSet[0].length > 0) remainingSprings.unshift(...newSet)
      val = (
        (
          requireBroken ? 0 : validConfigs([{ type: false, length: 1 }, ...remainingSprings], false, false, groups)
        ) + (
          requireSpace ? 0 : validConfigs([{ type: true, length: 1 }, ...remainingSprings], false, false, groups)
        )
      )
    }
  }

  cache[key] = val

  return val
}

const solvePart1 = (rows: string[]) => {
  let answer = 0

  for (let row of rows) {
    const [hotSpringsStr, groupsStr] = row.split(' ')
    let groups = groupsStr.split(',').map(s => parseInt(s))
    let hotSprings = charsToTypeList(hotSpringsStr)
    answer += validConfigs(hotSprings, false, false, groups)
  }

  return answer
}

const solvePart2 = (rows: string[]) => {
  let answer = 0

  for (let row of rows) {
    const [hotSpringsStr, groupsStr] = row.split(' ')
    let copiedGroups = copyString(groupsStr, ',', 4).split(',').map(s => parseInt(s))
    let copiedHotSprings = copyString(hotSpringsStr, '?', 4)
    let hotSprings = charsToTypeList(copiedHotSprings)
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
  console.log('\nPart 2:', withTime(() => solvePart2(input)))
}

main()
