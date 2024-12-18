import { fetchExample, fetchInput, getMod, withTime } from '../../utils'

const solvePart1 = (input: string[]) => {

  const [registerStr, programStr] = input

  const [regAStr, regBStr, regCStr] = registerStr.split('\n')

  let regA = parseInt(regAStr.split(": ")[1])
  let regB = parseInt(regBStr.split(": ")[1])
  let regC = parseInt(regCStr.split(": ")[1])

  const getCombo = (op: number) => {
    if (op < 4) return op
    if (op == 4) return regA
    if (op == 5) return regB
    if (op == 6) return regC
  }

  const instructions = programStr.split(': ')[1].split(',').map(i => parseInt(i))

  const [opcodes, operands] = instructions.reduce((ops, i, idx) => {
    ops[idx % 2].push(i)
    return ops
  }, [[],[]])

  let output: number[] = []

  regA = 0

  console.log(regA, regB, regC, opcodes, operands)

  for (let i = 0; i < opcodes.length; i++) {
    const opcode = opcodes[i]
    const operand = operands[i]
    switch (opcode) {
      case 0: {
        regA = Math.trunc(regA / 2 ** getCombo(operand))
        break
      }
      case 1: {
        regB = regB ^ operand
        break
      }
      case 2: {
        regB = getMod(getCombo(operand), 8)
        break
      }
      case 3: {
        if (regA == 0) break

        i = operand - 1
        break
      }
      case 4: {
        regB = regB ^ regC
        break
      }
      case 5: {
        output.push(getMod(getCombo(operand), 8))
        break
      }
      case 6: {
        regB = Math.trunc(regA / 2 ** getCombo(operand))
        break
      }
      case 7: {
        regC = Math.trunc(regA / 2 ** getCombo(operand))
        break
      }
    }
  }

  return output.join(",")
}

const solvePart2 = (input: string[]) => {
  const [registerStr, programStr] = input

  const instStr = programStr.split(': ')[1]

  const instructions = instStr.split(',')

  let output: string[] = []

    //23948989 (+256) [2, 4, 1, 1, 7, 5, 1, 5, 4]
  let regAStart = BigInt(1223970 * 8**9 + 23948989)

  while (true) {
    output = []
    let regA = regAStart
    let regB = BigInt(0)
    let regC = BigInt(0)
    let strIdx = 0
    let newInt = BigInt(0)

    while (regA != BigInt(0)) { // 3,0
      regB = (regA % BigInt(8)) ^ BigInt(1)
      regC = BigInt(Math.trunc(parseInt((regA / BigInt(BigInt(2) ** regB)).toString())))
      regB ^= BigInt(5) ^ regC
      newInt = regB % BigInt(8)
      if (instructions[strIdx] != newInt.toString()) break
      output.push(newInt.toString())
      regA = BigInt(Math.trunc(parseInt((regA / BigInt(8)).toString())))

      strIdx += 1
    }

    if (output.join(",") == "2,4,1,1,7,5,1,5,4,2,5,5,0,3,3,0") return regAStart
    regAStart += BigInt(1)
  }
}

const main = async () => {
  const input = (await fetchInput()).split('\n\n')
  const inputExample = (await fetchExample()).split('\n\n')

  console.log('\nPart 1 (example):', withTime(() => solvePart1(inputExample)))
  console.log('\nPart 1:', withTime(() => solvePart1(input)))

  console.log('\nPart 2:', withTime(() => solvePart2(input)))
}

main()
