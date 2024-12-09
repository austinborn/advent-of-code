import { fetchExample, fetchInput, withTime } from '../../utils'

const SPACE = 'space'
const FILE = 'file'

const getFileId = (idx: number) => idx / 2

const solvePart1 = (input: string) => {
  let answer = 0

  let endFileIdx = input.length - 1
  let endBlocksRemaining = parseInt(input[endFileIdx])
  let virtualIdx = 0

  for (let idx = 0; idx < endFileIdx; idx++) {
    for (let count = 0; count < parseInt(input[idx]); count++) {
      if ((idx % 2) != 0) {
        if (endBlocksRemaining == 0) {
          endFileIdx -= 2
          endBlocksRemaining = parseInt(input[endFileIdx])
        }
        endBlocksRemaining -= 1
      }
      answer += getFileId((idx % 2) == 0 ? idx : endFileIdx) * virtualIdx++
    }
  }

  while (endBlocksRemaining > 0) {
    answer += getFileId(endFileIdx) * virtualIdx++
    endBlocksRemaining -= 1
  }

  return answer
}

const solvePart2 = (input: string) => {
  const sequence = []

  for (let idx = 0; idx < input.length; idx++) {
    sequence.push((idx % 2) == 0
      ? { type: FILE, fileId: getFileId(idx), count: parseInt(input[idx]) }
      : { type: SPACE, space: parseInt(input[idx]) }
    )
  }

  for (let i = sequence.length - 1; i > 0; i--) {
    if (sequence[i].type != FILE) continue

    for (let spaceIdx = 0; spaceIdx < i; spaceIdx++) {
      if ((sequence[spaceIdx].type == SPACE) && sequence[i].count <= sequence[spaceIdx].space) {
        const remainingSpace = sequence[spaceIdx].space - sequence[i].count
        const filesToInsert = sequence.splice(i, 1, { type: SPACE, space: sequence[i].count })
        if (remainingSpace > 0) {
          filesToInsert.push({ type: SPACE, space: remainingSpace })
          i += 1
        }
        sequence.splice(spaceIdx, 1, ...filesToInsert)
        break
      }
    }
  }

  let virtualIdx = 0
  let answer = 0

  for (let block of sequence) {
    if (block.type == FILE) {
      for (let count = 0; count < block.count; count++) {
        answer += block.fileId * virtualIdx++
      }
    } else {
      virtualIdx += block.space
    }
  }

  return answer
}

const main = async () => {
  const input = await fetchInput()
  const inputExample = await fetchExample()

  console.log('\nPart 1 (example):', withTime(() => solvePart1(inputExample)))
  console.log('\nPart 1:', withTime(() => solvePart1(input)))

  console.log('\nPart 2 (example):', withTime(() => solvePart2(inputExample)))
  console.log('\nPart 2:', withTime(() => solvePart2(input)))
}

main()
