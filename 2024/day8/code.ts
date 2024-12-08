import { fetchExample, fetchInput, withTime } from '../../utils'

const getAntennaList = (rows: string[]) => {
  let antennaList: Record<string, { x: number, y: number }[]> = {}

  for (let y = 0; y < rows.length; y++) {
    const row = rows[y]
    for (let x = 0; x < row.length; x++) {
      const char = row[x]
      if (char == '.') continue
      if (!antennaList[char]) antennaList[char] = []

      antennaList[char].push({ x, y })
    }
  }

  return antennaList
}

const solvePart1 = (rows: string[]) => {
  const antennaList = getAntennaList(rows)

  let uniqueAntinodes = new Set()

  for (let char of Object.keys(antennaList)) {
    let [thisLocale, ...remainingLocales] = antennaList[char]
    while(remainingLocales.length > 0) {
      for (let locale of remainingLocales) {
        let diff = { x: locale.x - thisLocale.x, y: locale.y - thisLocale.y }

        let antinode = { x: thisLocale.x - diff.x, y: thisLocale.y - diff.y }
        if (antinode.x >= 0 && antinode.x < rows[0].length && antinode.y >= 0 && antinode.y < rows.length) {
          uniqueAntinodes.add(`${antinode.x},${antinode.y}`)
        }

        antinode = { x: locale.x + diff.x, y: locale.y + diff.y }
        if (antinode.x >= 0 && antinode.x < rows[0].length && antinode.y >= 0 && antinode.y < rows.length) {
          uniqueAntinodes.add(`${antinode.x},${antinode.y}`)
        }
      }
      [thisLocale, ...remainingLocales] = remainingLocales
    }
  }

  return uniqueAntinodes.size
}

const solvePart2 = (rows: string[]) => {
  const antennaList = getAntennaList(rows)

  let uniqueAntinodes = new Set()

  for (let char of Object.keys(antennaList)) {
    let [thisLocale, ...remainingLocales] = antennaList[char]
    while(remainingLocales.length > 0) {
      for (let locale of remainingLocales) {
        let diff = { x: locale.x - thisLocale.x, y: locale.y - thisLocale.y }

        let antinode = { x: thisLocale.x, y: thisLocale.y }
        while (antinode.x >= 0 && antinode.x < rows[0].length && antinode.y >= 0 && antinode.y < rows.length) {
          uniqueAntinodes.add(`${antinode.x},${antinode.y}`)
          antinode = { x: antinode.x - diff.x, y: antinode.y - diff.y }
        }

        antinode = { x: thisLocale.x + diff.x, y: thisLocale.y + diff.y }
        while (antinode.x >= 0 && antinode.x < rows[0].length && antinode.y >= 0 && antinode.y < rows.length) {
          uniqueAntinodes.add(`${antinode.x},${antinode.y}`)
          antinode = { x: antinode.x + diff.x, y: antinode.y + diff.y }
        }
      }
      [thisLocale, ...remainingLocales] = remainingLocales
    }
  }

  return uniqueAntinodes.size
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
