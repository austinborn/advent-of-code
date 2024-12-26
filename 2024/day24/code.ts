import { fetchExample, fetchInput, withTime } from '../../utils'

const ops = {
  'XOR': (num1: number, num2: number) => num1 ^ num2,
  'OR': (num1: number, num2: number) => num1 | num2,
  'AND': (num1: number, num2: number) => num1 & num2
}

const solvePart1 = (input: string[]) => {
  const [initWireParitiesStr, gatesStr] = input

  const initWireParities = initWireParitiesStr.split('\n')
  const gates = gatesStr.split('\n')

  const gateState: {
    [gate: string]: {
      leftState?: boolean
      rightState?: boolean
      op: string
    }
  } = {}

  const gatesConnectedToWire: {
    [wire: string]: {
      leftFor: Set<string>,
      rightFor: Set<string>
    }
  } = {}

  let zMax = 0

  for (let gate of gates) {
    const [left, op, right, , gateName] = gate.split(' ')
    if (gateName[0] == 'z') zMax = Math.max(zMax, parseInt(gateName.slice(1)))

    gateState[gateName] = { op }

    if (!gatesConnectedToWire[left]) gatesConnectedToWire[left] = { leftFor: new Set(), rightFor: new Set() }
    if (!gatesConnectedToWire[right]) gatesConnectedToWire[right] = { leftFor: new Set(), rightFor: new Set() }

    gatesConnectedToWire[left].leftFor.add(gateName)
    gatesConnectedToWire[right].rightFor.add(gateName)
  }

  const wireState: { [wire: string]: boolean } = {}

  let queue: string[] = []

  for (let initWireParity of initWireParities) {
    const [name, state] = initWireParity.split(': ')
    const boolState = !!parseInt(state)
    wireState[name] = boolState
    for (let gate of gatesConnectedToWire[name].leftFor.values()) {
      gateState[gate].leftState = boolState
      if (gateState[gate].rightState != undefined) queue.push(gate)
    }
    for (let gate of gatesConnectedToWire[name].rightFor.values()) {
      gateState[gate].rightState = boolState
      if (gateState[gate].leftState != undefined) queue.push(gate)
    }
  }

  const finalBinary = new Array(zMax)

  while (queue.length > 0) {
    const newQueue: string[] = []
    for (let gate of queue) {
      const thisGateState = gateState[gate]
      let state = ops[thisGateState.op](thisGateState.leftState, thisGateState.rightState)

      if (gate[0] == 'z') finalBinary[parseInt(gate.slice(1))] = state
      else {
        for (let nextGate of gatesConnectedToWire[gate].leftFor.values()) {
          gateState[nextGate].leftState = state
          if (gateState[nextGate].rightState != undefined) newQueue.push(nextGate)
        }
        for (let nextGate of gatesConnectedToWire[gate].rightFor.values()) {
          gateState[nextGate].rightState = state
          if (gateState[nextGate].leftState != undefined) newQueue.push(nextGate)
        }
      }
    }
    queue = [...newQueue]
  }

  return parseInt(finalBinary.reverse().map(b => b ? "1" : "0").join(''), 2)
}

const solvePart2 = (input: string[]) => {
  const [initWireParitiesStr, gatesStr] = input

  const gates = gatesStr.split('\n')

  const gateState: {
    [gate: string]: {
      left: string
      leftState?: boolean
      right: string
      rightState?: boolean
      op: string
    }
  } = {}

  const gatesConnectedToWire: {
    [wire: string]: {
      leftFor: Set<string>,
      rightFor: Set<string>
    }
  } = {}

   /* Steps to solve:
   1. Start with empty swap dict
   2. Use console.log(gateStrings) below to print out a JSON of the generated strings for each Z
   3. Observe the JSON in order of Zs and look for areas where the pattern of previous XORs, ANDs and ORs breaks down.
   4. Iteratively add swapped pairs until you've found all 4.
   */

  const swap = {
    //TODO fill me in with pairs of swapped gate names
  }

  let zMax = 0

  for (let gate of gates) {
    const [left, op, right, , gateNamePreswap] = gate.split(' ')
  
    let gateName = swap[gateNamePreswap] ?? gateNamePreswap

    if (gateName[0] == 'z') zMax = Math.max(zMax, parseInt(gateName.slice(1)))

    gateState[gateName] = { op, left, right }

    if (!gatesConnectedToWire[left]) gatesConnectedToWire[left] = { leftFor: new Set(), rightFor: new Set() }
    if (!gatesConnectedToWire[right]) gatesConnectedToWire[right] = { leftFor: new Set(), rightFor: new Set() }

    gatesConnectedToWire[left].leftFor.add(gateName)
    gatesConnectedToWire[right].rightFor.add(gateName)
  }

  let initialQueue: string[] = []

  const finalBinaryX = new Array<boolean>(zMax)
  const finalBinaryY = new Array<boolean>(zMax)

  const initWireParities = initWireParitiesStr.split('\n')

  const wireState: { [wire: string]: boolean } = {}

  for (let initWireParity of initWireParities) {
    const [name, state] = initWireParity.split(': ')
    const boolState = !!parseInt(state)
    wireState[name] = boolState
    for (let gate of gatesConnectedToWire[name].leftFor.values()) {
      gateState[gate].leftState = boolState
      if (gateState[gate].rightState != undefined) initialQueue.push(gate)
    }
    for (let gate of gatesConnectedToWire[name].rightFor.values()) {
      gateState[gate].rightState = boolState
      if (gateState[gate].leftState != undefined) initialQueue.push(gate)
    }

    if (name[0] == 'x') finalBinaryX[parseInt(name.slice(1))] = boolState
    else if (name[0] == 'y') finalBinaryY[parseInt(name.slice(1))] = boolState
  }

  const allGates = Object.keys(gateState).filter(g => g[0] != 'x' && g[0] != 'y')

  const getStr: (gate: string) => { str: string, min: number } = (gate) => {
    const { left, right, op } = gateState[gate]
    const baseX = left[0] == 'x'
    const baseY = left[0] == 'y'

    if (baseX) return {
      str: `(${left} ${op}<${gate}> ${right})`,
      min: parseInt(left.slice(1))
    }
    else if (baseY) return {
      str: `(${right} ${op}<${gate}> ${left})`,
      min: parseInt(left.slice(1))
    }

    const leftStr = getStr(left)
    const rightStr = getStr(right)
    const str = leftStr.min < rightStr.min
      ? `(${leftStr.str} ${op}<${gate}> ${rightStr.str})`
      : `(${rightStr.str} ${op}<${gate}> ${leftStr.str})`
    return { str, min: Math.min(leftStr.min, rightStr.min) }
  }

  const gateStrings = {}
  for (let gate of allGates) {
    if (gate[0] == 'z') gateStrings[gate] = getStr(gate).str
  }
  // console.log(gateStrings)

  return Object.keys(swap).sort().join(',')
}

const main = async () => {
  const input = (await fetchInput()).split('\n\n')
  const inputExample = (await fetchExample()).split('\n\n')

  console.log('\nPart 1 (example):', withTime(() => solvePart1(inputExample)))
  console.log('\nPart 1:', withTime(() => solvePart1(input)))
  console.log('\nPart 2:', withTime(() => solvePart2(input)))
}

main()
