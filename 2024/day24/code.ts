import { fetchExample, fetchInput, withTime } from '../../utils'

const ops = {
  'XOR': (num1: number, num2: number) => num1 ^ num2,
  'OR': (num1: number, num2: number) => num1 | num2,
  'AND': (num1: number, num2: number) => num1 & num2
}

const boolToString = (b: boolean) => b ? "1" : "0"
const stringToBool = (s: string) => s == "1" ? true : false

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

  return parseInt(finalBinary.reverse().map(boolToString).join(''), 2)
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

  let zMax = 0

  for (let gate of gates) {
    const [left, op, right, , gateName] = gate.split(' ')
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

  let finalDecZ = parseInt(finalBinaryX.reverse().map(boolToString).join(''),2) + parseInt(finalBinaryY.reverse().map(boolToString).join(''),2)

  let finalBinaryZ = finalDecZ.toString(2).padStart(zMax + 1, '0').split('').reverse().map(stringToBool)

  const allGates = Object.keys(gateState).filter(g => g[0] != 'x' && g[0] != 'y')

  const getStr = (gate: string) => {
    const { left, right, op } = gateState[gate]
    const base = left[0] == 'x' || left[0] == 'y'
    return`(${base ? left : getStr(left)} ${op} ${base ? right : getStr(right)})`
  }

  // const gateStrings = {}
  // for (let gate of allGates) if (gate[0] == 'z') gateStrings[gate] = getStr(gate)
  // console.log(gateStrings)

  for               (let i = 0;     i < allGates.length - 7;  i++) {
    for             (let j = i + 1; j < allGates.length;      j++) {
      for           (let k = i + 1; k < allGates.length - 5;  k++) {
        if (k == j) continue
        for         (let l = k + 1; l < allGates.length;      l++) {
          if (l == j) continue
          for       (let m = k + 1; m < allGates.length - 3;  m++) {
            if (m == j || m == l) continue
            for     (let n = m + 1; n < allGates.length;      n++) {
              if (n == j || n == l) continue
              for   (let o = m + 1; o < allGates.length - 1;  o++) {
                if (o == j || o == l || o == n) continue
                for (let p = o + 1; p < allGates.length;      p++) {
                  if (p == j || p == l || p == n) continue

                  // console.log([i,j,k,l,m,n,o,p].join(','))

                  const swap = {
                    [allGates[i]]: allGates[j], [allGates[j]]: allGates[i],
                    [allGates[k]]: allGates[l], [allGates[l]]: allGates[k],
                    [allGates[m]]: allGates[n], [allGates[n]]: allGates[m],
                    [allGates[o]]: allGates[p], [allGates[p]]: allGates[o]
                  }

                  const getGateWithSwap = (gateName: string) => swap[gateName] ?? gateName

                  let matchesBinary = true

                  let queue = [...initialQueue]

                  while (matchesBinary && queue.length > 0) {
                    const newQueue: string[] = []
                    for (let gate of queue) {
                      const thisGateState = gateState[gate]
                      let state = ops[thisGateState.op](thisGateState.leftState, thisGateState.rightState)

                      const swappedGate = getGateWithSwap(gate)
                      const parsedIdx = parseInt(swappedGate.slice(1))

                      if (swappedGate[0] == 'z' && (finalBinaryZ[parsedIdx] != state)) {
                        matchesBinary = false
                        // console.log("No match:", swappedGate, parsedIdx, finalBinaryZ[parsedIdx], state)
                        break
                      } else {
                        for (let nextGate of gatesConnectedToWire[swappedGate].leftFor.values()) {
                          gateState[nextGate].leftState = state
                          if (gateState[nextGate].rightState != undefined) newQueue.push(nextGate)
                        }
                        for (let nextGate of gatesConnectedToWire[swappedGate].rightFor.values()) {
                          gateState[nextGate].rightState = state
                          if (gateState[nextGate].leftState != undefined) newQueue.push(nextGate)
                        }
                      }
                    }
                    if (!matchesBinary) break
                    queue = [...newQueue]
                  }

                  if (matchesBinary) {
                    return [
                      allGates[i],allGates[j],allGates[k],allGates[l],
                      allGates[m],allGates[n],allGates[o],allGates[p],
                    ].sort().join(',')
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return 0
}

const main = async () => {
  const input = (await fetchInput()).split('\n\n')
  const inputExample = (await fetchExample()).split('\n\n')
  const inputExample2 = (await fetchExample("inputExample2")).split('\n\n')

  console.log('\nPart 1 (example):', withTime(() => solvePart1(inputExample)))
  console.log('\nPart 1:', withTime(() => solvePart1(input)))
  // console.log('\nPart 2:', withTime(() => solvePart2(input))) //dhb,kng,pbr,phv,qpp,vdq,wfd,z00 not right
}

main()
