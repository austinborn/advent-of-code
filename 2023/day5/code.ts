
import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { getSum, getMaxes, getFactors } from '../../utils'

const main = async () => {
  console.log("Solving Puzzle:")
  const inputDir = readFileSync('./2023/day5/inputDir.txt', 'utf8')
  const inputNodes = readFileSync('./2023/day5/inputNodes.txt', 'utf8')

  const instructions = inputDir.split('')

  const nodeTree = inputNodes.split('\n').reduce((tree, line) => {
    const regex = line.match('(?<node>[A-Z]{3}) = \\((?<left>[A-Z]{3}), (?<right>[A-Z]{3})')// \= \((?<left>[A-Z]{3})\, (?<right>[A-Z]{3})
    const { node, left, right } = regex?.groups
    tree[node] = { node, left, right }
    return tree
  }, {})

  // Part 1

  let node = nodeTree['AAA']
  let nextDirIdx = 0
  let nextNode
  const dirLen = instructions.length
  // console.log("# of Directions: ", dirLen)
  // console.log('# of Nodes: ', Object.entries(nodeTree).length) //714

  const endNodes = {}

  let totalDirections = 0

  while (nextNode != 'ZZZ') {
    nextNode = instructions[nextDirIdx] === 'L' ? node.left : node.right
    totalDirections++
    // console.log(nextNode, instructions[nextDirIdx])
    node = nodeTree[nextNode]
    nextDirIdx++
    if (nextDirIdx === dirLen) {
      if (endNodes[nextNode]) break
      else endNodes[nextNode] = true
      nextDirIdx = 0
      // console.log(nextNode)
    }
  }
  console.log("Part 1 Answer: ", totalDirections)

  // Part 2

  const allNodes = Object.keys(nodeTree)

  let currentNodes = allNodes
    .filter(node => node[2] == 'A')
    .map(n => nodeTree[n])
    .sort((a,b) => a.node.localeCompare(b.node))

  const endingNodes = allNodes.reduce((nodes, node) => {
    if (node[2] == 'Z') nodes[node] = true
    return nodes
  }, {})

  const cycles = []

  for (let j = 0; j< currentNodes.length; j++) {
    totalDirections = 0
  nextDirIdx = 0
  // const endCurrentNodes = {}
  // let curNodesKey
  let allEnding
  let i
    let thisNode = currentNodes[j]

    while(true) {
      // console.log(totalDirections)
      // console.log("This Dir #: ", nextDirIdx)
      // console.log("Current Nodes: ", curNodesKey)
      if (instructions[nextDirIdx] == 'L') {
        thisNode = nodeTree[thisNode.left]
      } else {
        thisNode = nodeTree[thisNode.right]
      }
      totalDirections++
      if (totalDirections % 10_000_000 === 0) console.log(totalDirections)
  
      // allEnding = true
      // for (i = 0; i < currentNodes.length; i++) {
        if (thisNode.node[2] === 'Z') {
          // allEnding = false
          break
        }
      // }
      // if (allEnding) break
  
      // curNodesKey = currentNodes.map(n => n.node).join(",")
      nextDirIdx = (nextDirIdx + 1) % dirLen
    }

    cycles.push(totalDirections)
  }

  console.log(cycles)

  for (let i = 0; i < cycles.length; i++) {
    console.log("Factors of ", cycles[i], ": ", getFactors(cycles[i]))
  }

  console.log("Part 2 Answer: ", cycles)

  console.log(73*307*59*43*47*53*79)
}

main()
