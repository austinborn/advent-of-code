import { fetchExample, fetchInput, withTime } from '../../utils'

const getFileId = (idx: number) => idx / 2

const solvePart1 = (input: string) => {
  let answer = 0

  let idx = 0
  let endFileIdx = input.length - 1
  let endBlocksRemaining = parseInt(input[endFileIdx])

  let virtualIdx = 0

  while (idx < endFileIdx) {
    let count = parseInt(input[idx])
    if ((idx % 2) == 0) {
      while (count > 0) {
        answer += getFileId(idx) * virtualIdx
        count -= 1
        virtualIdx += 1
      }
    } else {
      while (count > 0) {
        if (endBlocksRemaining == 0) {
          endFileIdx -= 2
          endBlocksRemaining = parseInt(input[endFileIdx])
        }
        answer += getFileId(endFileIdx) * virtualIdx
        count -= 1
        virtualIdx += 1
        endBlocksRemaining -= 1
      }
    }
    idx += 1
  }

  while (endBlocksRemaining > 0) {
    answer += getFileId(endFileIdx) * virtualIdx
    virtualIdx += 1
    endBlocksRemaining -= 1
  }

  return answer
}

const solvePart2 = (input: string) => {
  let sequence = []

  for (let idx = 0; idx < input.length; idx++) {
    if ((idx % 2) == 0) {
      sequence.push({ type: 'file', fileId: getFileId(idx), count: parseInt(input[idx]) })
    } else {
      sequence.push({ type: 'space', space: parseInt(input[idx]) })
    }
  }

  let idx = sequence.length - 1

  while (idx > 0) {
    if (sequence[idx].type == 'file') {
      let spaceIdx = 0
      while (spaceIdx < idx) {
        if ((sequence[spaceIdx].type == 'space') && sequence[idx].count <= sequence[spaceIdx].space) {
          let remainingSpace = sequence[spaceIdx].space - sequence[idx].count
          const filesToInsert = sequence.splice(idx, 1, { type: 'space', space: sequence[idx].count })
          if (remainingSpace > 0) {
            filesToInsert.push({ type: 'space', space: remainingSpace })
            idx += 1
          }
          sequence.splice(spaceIdx, 1, ...filesToInsert)
          break
        }
        spaceIdx += 1
      }
    }
    idx -= 1
  }

  let virtualIdx = 0
  let answer = 0

  for (let block of sequence) {
    if (block.type == 'file') {
      let count = block.count
      while (count > 0) {
        answer += block.fileId * virtualIdx
        virtualIdx += 1
        count -= 1
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
