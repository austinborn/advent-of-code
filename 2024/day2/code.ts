import { fetchExample, fetchInput, withTime } from '../../utils'

const isReportSafe = (levels: number[]) => (unsafeIdx(levels) == null)

const unsafeIdx = (levels: number[]) => {
  let desc = (levels[0] - levels[1]) > 0
  for (let i = 0; i < levels.length - 1; i++) {
    const diff = levels[i] - levels[i + 1]
    if (
      (diff == 0) ||
      (diff > 3) ||
      (diff < -3) ||
      (diff > 0 && !desc) ||
      (diff < 0 && desc)
    ) {
      return i
    }
  }
  return null
}

const solvePart1 = (rows: string[]) => {
  let answer = rows.reduce((count, report) => {
    const levels = report.split(' ').map(i => parseInt(i))
    return isReportSafe(levels) ? count + 1 : count
  }, 0)

  return answer
}

const solvePart2 = (rows: string[]) => {
  let answer = rows.reduce((count, report) => {
    const levels = report.split(' ').map(i => parseInt(i))
    let unsafeIdxVar = unsafeIdx(levels)

    if (unsafeIdxVar != null) {
      const levelsWithout0 = [...levels]
      levelsWithout0.splice(0, 1)
      const levelsWithout1 = [...levels]
      levelsWithout1.splice(1, 1)
      const levelsWithoutFirst = [...levels]
      levelsWithoutFirst.splice(unsafeIdxVar, 1)
      const levelsWithoutSecond = [...levels]
      levelsWithoutSecond.splice(unsafeIdxVar + 1, 1)
      return (
        isReportSafe(levelsWithout0) ||
        isReportSafe(levelsWithout1) ||
        isReportSafe(levelsWithoutFirst) ||
        isReportSafe(levelsWithoutSecond)
      ) ? count + 1 : count
    } else return count + 1
  }, 0)


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
