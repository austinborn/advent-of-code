import { fetchExample, fetchInput, withTime } from '../../utils'

const solvePart = (input: string[]) => {
  const edges: {[node: string]: Set<string> } = {}

  const getGroups = (startingNode: string) => {
    const seen = new Set<string>();
    const queue = [startingNode];
  
    while (queue.length) {
      const node = queue.shift()
      // console.log("Checking:", node)
      if (!seen.has(node) && edges[node].isSupersetOf(seen)) {
        // console.log("Push:", edges[node])
        seen.add(node)
        queue.push(...edges[node])
      }
    }

    // console.log(startingNode, seen)
  
    return [...seen]
  }

  const nodes = new Set<string>()
  
  for (let line of input) {
    const [a, b] = line.trim().split('-')
    nodes.add(a)
    nodes.add(b)
    if (!edges[a]) edges[a] = new Set()
    if (!edges[b]) edges[b] = new Set()
    edges[a].add(b)
    edges[b].add(a)
  }

  let largest = 0

  for (let node of nodes) {
    largest = Math.max(largest, getGroups(node).length)
  }

  return largest
}

const main = async () => {
  const input = (await fetchExample("input2")).split('\n')
  const inputExample = (await fetchExample()).split('\n')

  console.log('\nPart 1 (example):', withTime(() => solvePart(inputExample)))
  // console.log('\nPart 1:', withTime(() => solvePart1(input)))

  // console.log('\nPart 2 (example):', withTime(() => solvePart2(inputExample)))
  console.log('\nPart 2:', withTime(() => solvePart(input)))
}

main()
