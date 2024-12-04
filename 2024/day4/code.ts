
import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { getSum, getMaxes } from '../../utils'

const check0 = (matrix: string[][], i: number, j: number) => (
  matrix[i][j] == 'X' &&
  matrix[i][j + 1] == 'M' &&
  matrix[i][j + 2] == 'A' &&
  matrix[i][j + 3] == 'S'
) && 1

const check45 = (matrix: string[][], i: number, j: number) => (
  matrix[i][j] == 'X' &&
  matrix[i - 1][j + 1] == 'M' &&
  matrix[i - 2][j + 2] == 'A' &&
  matrix[i - 3][j + 3] == 'S'
) && 1

const check90 = (matrix: string[][], i: number, j: number) => (
  matrix[i][j] == 'X' &&
  matrix[i - 1][j] == 'M' &&
  matrix[i - 2][j] == 'A' &&
  matrix[i - 3][j] == 'S'
) && 1

const check135 = (matrix: string[][], i: number, j: number) => (
  matrix[i][j] == 'X' &&
  matrix[i - 1][j - 1] == 'M' &&
  matrix[i - 2][j - 2] == 'A' &&
  matrix[i - 3][j - 3] == 'S'
) && 1

const check180 = (matrix: string[][], i: number, j: number) => (
  matrix[i][j] == 'X' &&
  matrix[i][j - 1] == 'M' &&
  matrix[i][j - 2] == 'A' &&
  matrix[i][j - 3] == 'S'
) && 1

const check225 = (matrix: string[][], i: number, j: number) => (
  matrix[i][j] == 'X' &&
  matrix[i + 1][j - 1] == 'M' &&
  matrix[i + 2][j - 2] == 'A' &&
  matrix[i + 3][j - 3] == 'S'
) && 1

const check270 = (matrix: string[][], i: number, j: number) => (
  matrix[i][j] == 'X' &&
  matrix[i + 1][j] == 'M' &&
  matrix[i + 2][j] == 'A' &&
  matrix[i + 3][j] == 'S'
) && 1

const check315 = (matrix: string[][], i: number, j: number) => (
  matrix[i][j] == 'X' &&
  matrix[i + 1][j + 1] == 'M' &&
  matrix[i + 2][j + 2] == 'A' &&
  matrix[i + 3][j + 3] == 'S'
) && 1

const main = async () => {
  const input = readFileSync(`./${process.argv[2]}/day${process.argv[3]}/input.txt`, 'utf8')

  console.log("Solving Puzzle:")

  let answer = 0
  let letterMatrix = input.split('\n').map(row => row.split(''))

  for (let i = 0; i < letterMatrix.length; i++) {
    for (let j = 0; j < letterMatrix[0].length; j++) {
      if (i < 3) {
        if (j < 3) {
          // Top left corner

          answer += (
            check0(letterMatrix, i, j) +
            check270(letterMatrix, i, j) +
            check315(letterMatrix, i, j)
          )

        } else if (j > letterMatrix[0].length - 4) {
          // Top right corner

          answer += (
            check180(letterMatrix, i, j) +
            check225(letterMatrix, i, j) +
            check270(letterMatrix, i, j)
          )

        } else {
          // Top center

          answer += (
            check0(letterMatrix, i, j) +
            check180(letterMatrix, i, j) +
            check225(letterMatrix, i, j) +
            check270(letterMatrix, i, j) +
            check315(letterMatrix, i, j)
          )

        }
      } else if (i > letterMatrix.length - 4) {
        if (j < 3) {
          // Bottom left corner

          answer += (
            check0(letterMatrix, i, j) +
            check45(letterMatrix, i, j) + 
            check90(letterMatrix, i, j)
          )

        } else if (j > letterMatrix[0].length - 4) {
          // Bottom right corner

          answer += (
            check90(letterMatrix, i, j) +
            check135(letterMatrix, i, j) +
            check180(letterMatrix, i, j)
          )

        } else {
          // Bottom center

          answer += (
            check0(letterMatrix, i, j) +
            check45(letterMatrix, i, j) + 
            check90(letterMatrix, i, j) +
            check135(letterMatrix, i, j) +
            check180(letterMatrix, i, j)
          )

        }
      } else {
        if (j < 3) {
          // Middle left

          answer += (
            check0(letterMatrix, i, j) +
            check45(letterMatrix, i, j) + 
            check90(letterMatrix, i, j) +
            check270(letterMatrix, i, j) +
            check315(letterMatrix, i, j)
          )

        } else if (j > letterMatrix[0].length - 4) {
          // Middle right

          answer += (
            check90(letterMatrix, i, j) +
            check135(letterMatrix, i, j) +
            check180(letterMatrix, i, j) +
            check225(letterMatrix, i, j) +
            check270(letterMatrix, i, j)
          )

        } else {
          // Center

          answer += (
            check0(letterMatrix, i, j) +
            check45(letterMatrix, i, j) + 
            check90(letterMatrix, i, j) +
            check135(letterMatrix, i, j) +
            check180(letterMatrix, i, j) +
            check225(letterMatrix, i, j) +
            check270(letterMatrix, i, j) +
            check315(letterMatrix, i, j)
          )
        }
      }
    }
  }

  console.log('\nPart 1: ' + answer)

  answer = 0

  for (let i = 1; i < letterMatrix.length - 1; i++) {
    for (let j = 1; j < letterMatrix[0].length - 1; j++) {
      if (letterMatrix[i][j] != 'A') continue

      if (!(
        (letterMatrix[i - 1][j - 1] == 'M' && letterMatrix[i + 1][j + 1] == 'S') ||
        (letterMatrix[i - 1][j - 1] == 'S' && letterMatrix[i + 1][j + 1] == 'M')
      )) continue 

      if (!(
        (letterMatrix[i + 1][j - 1] == 'M' && letterMatrix[i - 1][j + 1] == 'S') ||
        (letterMatrix[i + 1][j - 1] == 'S' && letterMatrix[i - 1][j + 1] == 'M')
      )) continue 

      answer += 1
    }
  }

  console.log('\nPart 2: ' + answer)

}

main()
