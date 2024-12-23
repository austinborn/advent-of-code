import { fetchExample, fetchInput, withTime } from '../../utils'

const hasT = (c1: string, c2: string, c3: string) => c1[0] == 't' || c2[0] == 't' || c3[0] == 't'

const solvePart1 = (input: string[]) => {
  let pairsWithComputer: { [c1: string]: Set<string> } = {}

  let trifectas = 0

  for (let pair of input) {
    const [c1, c2] = pair.split('-')
    if (pairsWithComputer[c1] == undefined) pairsWithComputer[c1] = new Set()
    if (pairsWithComputer[c2] == undefined) pairsWithComputer[c2] = new Set()

    if (pairsWithComputer[c1].size > 0 && pairsWithComputer[c2].size > 0) {
      for (let c3 of pairsWithComputer[c1]) {
        if (pairsWithComputer[c2].has(c3) && hasT(c1, c2, c3)) {
          trifectas += 1
        }
      }
    }

    pairsWithComputer[c1].add(c2)
    pairsWithComputer[c2].add(c1)
  }

  return trifectas
}

const solvePart2 = (input: string[]) => {
  let pairsWithComputer: { [c1: string]: Set<string> } = {}

  let fullLANs: string[][] = []

  for (let pair of input) {
    const [c1, c2] = pair.split('-')
    if (pairsWithComputer[c1] == undefined) pairsWithComputer[c1] = new Set()
    if (pairsWithComputer[c2] == undefined) pairsWithComputer[c2] = new Set()

    pairsWithComputer[c1].add(c2)
    pairsWithComputer[c2].add(c1)
    fullLANs.push([c1,c2])
  }

  let allCs = Object.keys(pairsWithComputer)
  let newLANs = fullLANs

  while (newLANs.length > 0) {
    fullLANs = newLANs
    const newLANSet = new Set<string>()
    for (let fullLAN of fullLANs) {
      for (let c of allCs) {
        if (!fullLAN.includes(c)) {
          let canJoinLAN = true
          for (let cLAN of fullLAN) {
            if (!pairsWithComputer[c].has(cLAN)) {
              canJoinLAN = false
              break
            }
          }
          if (canJoinLAN) newLANSet.add([c, ...fullLAN].sort().join(','))
        }
      }
    }

    newLANs = []
    for (let newLAN of newLANSet.values()) newLANs.push(newLAN.split(','))
  }

  return fullLANs[0].join(',')
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
