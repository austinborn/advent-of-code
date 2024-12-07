import { fetchExample, fetchInput } from '../../utils'

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

const solvePart1 = (header: string, rows: string[]) => {
  let answer = rows.reduce((count, report) => {
    const levels = report.split(' ').map(i => parseInt(i))
    return isReportSafe(levels) ? count + 1 : count
  }, 0)

  console.log(header, answer)
}

const solvePart2 = (header: string, rows: string[]) => {
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


  console.log(header, answer)
}

const main = async () => {
  const input = (await fetchInput()).split('\n')
  const inputExample = (await fetchExample()).split('\n')

  solvePart1('\nPart 1 (example): ', inputExample)
  solvePart1('\nPart 1: ', input)

  solvePart2('\nPart 2 (example): ', inputExample)
  solvePart2('\nPart 2: ', input)
}

main()
