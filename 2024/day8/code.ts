import { fetchExample, fetchInput, withTime } from '../../utils'

const solvePart1 = (rows: string[]) => {
  let uniqueAntennas = new Set<string>()
  let antennaList: Record<string, { x: number, y: number }[]> = {}

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    for (let j = 0; j < row.length; j++) {
      const char = row[j]
      if (char == '.') continue
      if (!uniqueAntennas.has(char)) {
        uniqueAntennas.add(char)
        antennaList[char] = [{ x: j, y: i }]
      } else {
        antennaList[char].push({ x: j, y: i })
      }
    }
  }

  let uniqueAntinodes = new Set()

  for (let char of uniqueAntennas) {
    let locales = antennaList[char]
    let [thisLocale, ...remainingLocales] = locales
    while(remainingLocales.length > 0) {
      console.log(thisLocale, remainingLocales)
      for (let locale of remainingLocales) {
        let antinodeX = 2 * thisLocale.x - locale.x
        let antinodeY = 2 * thisLocale.y - locale.y
        if (
          antinodeX >= 0 &&
          antinodeX < rows[0].length &&
          antinodeY >= 0 &&
          antinodeY < rows.length
        ) {
          if (!uniqueAntinodes.has(`${antinodeX},${antinodeY}`)) uniqueAntinodes.add(`${antinodeX},${antinodeY}`)
        }

        antinodeX = 2 * locale.x - thisLocale.x
        antinodeY = 2 * locale.y - thisLocale.y
        if (
          antinodeX >= 0 &&
          antinodeX < rows[0].length &&
          antinodeY >= 0&&
          antinodeY < rows.length
        ) {
          if (!uniqueAntinodes.has(`${antinodeX},${antinodeY}`)) uniqueAntinodes.add(`${antinodeX},${antinodeY}`)
        }
      }
      [thisLocale, ...remainingLocales] = remainingLocales
    }
  }

  return uniqueAntinodes.size
}

const solvePart2 = (rows: string[]) => {
  let uniqueAntennas = new Set<string>()
  let antennaList: Record<string, { x: number, y: number }[]> = {}

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    for (let j = 0; j < row.length; j++) {
      const char = row[j]
      if (char == '.') continue
      if (!uniqueAntennas.has(char)) {
        uniqueAntennas.add(char)
        antennaList[char] = [{ x: j, y: i }]
      } else {
        antennaList[char].push({ x: j, y: i })
      }
    }
  }

  let uniqueAntinodes = new Set()

  for (let char of uniqueAntennas) {
    let locales = antennaList[char]
    let [thisLocale, ...remainingLocales] = locales
    while(remainingLocales.length > 0) {
      for (let locale of remainingLocales) {
        const diffx = thisLocale.x - locale.x
        const diffy = thisLocale.y - locale.y

        let upperx = (
          diffx > 0
            ? ((thisLocale.x > locale.x) ? thisLocale.x : locale.x)
            : ((thisLocale.x < locale.x) ? thisLocale.x : locale.x)
          ) + diffx
        let uppery = (
          diffx > 0
            ? ((thisLocale.x > locale.x) ? thisLocale.y : locale.y)
            : ((thisLocale.x < locale.x) ? thisLocale.y : locale.y)
          ) + diffy
        while ( upperx >= 0 && upperx < rows[0].length && uppery < rows.length && uppery >= 0) {
          if (!uniqueAntinodes.has(`${upperx},${uppery}`)) uniqueAntinodes.add(`${upperx},${uppery}`)
          upperx += diffx
          uppery += diffy
        }

        upperx = (
          diffx > 0
            ? ((thisLocale.x < locale.x) ? thisLocale.x : locale.x)
            : ((thisLocale.x > locale.x) ? thisLocale.x : locale.x)
          ) + diffx
        uppery = (
          diffx > 0
            ? ((thisLocale.x < locale.x) ? thisLocale.y : locale.y)
            : ((thisLocale.x > locale.x) ? thisLocale.y : locale.y)
          ) + diffy
        while ( upperx >= 0 && upperx < rows[0].length && uppery < rows.length && uppery >= 0) {
          if (!uniqueAntinodes.has(`${upperx},${uppery}`)) uniqueAntinodes.add(`${upperx},${uppery}`)
          upperx -= diffx
          uppery -= diffy
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
