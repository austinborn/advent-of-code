import { fetchExample, fetchInput } from '../../utils'

class GraphNode {
  page
  previousPages = new Set<string>()
  nextPages = new Set<string>()

  constructor(thisPage: string) {
    this.page = thisPage
  }

  addNextPage(page: string) {
    if (!this.nextPages.has(page)) {
      this.nextPages.add(page)
    }
  }

  addPreviousPage(page: string) {
    if (!this.previousPages.has(page)) {
      this.previousPages.add(page)
    }
  }
}

class Graph {
  nodes: Record<string,GraphNode> = {}
  pageList: string[] = []

  constructor() { }

  addRule(firstPage: string, secondPage: string) {
    if (!this.nodes[firstPage]) {
      this.nodes[firstPage] = new GraphNode(firstPage)
      this.pageList.push(firstPage)
    }

    if (!this.nodes[secondPage]) {
      this.nodes[secondPage] = new GraphNode(secondPage)
      this.pageList.push(secondPage)
    }

    this.nodes[firstPage].addNextPage(secondPage)
    this.nodes[secondPage].addPreviousPage(firstPage)
  }

  getUniqueStarts() {
    const uniqueStarts: GraphNode[] = []
    for (let page of this.pageList) {
      const node = this.nodes[page]
      if (node.previousPages.size == 0) uniqueStarts.push(node)
    }

    return uniqueStarts
  }

  getRequiredPageOrder() {
    const pageAdded = {}
    const pagesToAdd = []
    const pagesToAddDict = {}

    const order: string[] = []

    const uniqueStarts = this.getUniqueStarts()
    for (let uniqueStart of uniqueStarts) {
      order.push(uniqueStart.page)
      for (let nextPage of uniqueStart.nextPages.values()) {
        if (!pagesToAddDict[nextPage]) {
          pagesToAdd.push(nextPage)
          pagesToAddDict[nextPage] = true
        }
      }
      pageAdded[uniqueStart.page] = true
    }

    let i = 0

    while (pagesToAdd.length > 0) {
      let node = this.nodes[pagesToAdd[i]]

      let canAddPage = true

      for (let previousPage of node.previousPages.values()) {
        if (!pageAdded[previousPage]) {
          canAddPage = false
          break
        }
      }

      if (canAddPage) {
        order.push(node.page)
        for (let nextPage of node.nextPages.values()) {
          if (!pagesToAddDict[nextPage]) {
            pagesToAdd.push(nextPage)
            pagesToAddDict[nextPage] = true
          }
        }
        pageAdded[node.page] = true
        pagesToAdd.splice(i, 1)
        delete pagesToAddDict[node.page]
      } else {
        i++
      }

      i %= pagesToAdd.length
    }

    return order
  }
}

const solvePart1 = (input: string) => {
  const [rules, updates] = input.split('\n\n').map(r => r.split('\n'))

  const rulesPerPage = {}

  for (let rule of rules) {
    const [firstPage, secondPage] = rule.split('|')
    if (!rulesPerPage[firstPage]) rulesPerPage[firstPage] = []
    rulesPerPage[firstPage].push(secondPage)
  }

  let trueUpdates = []

  for (let k = 0; k < updates.length; k++) {
    let update = updates[k]
    const pages = update.split(',')

    const isPageBefore = {}

    for (let i = 0; i < pages.length; i++) {
      let firstPage = pages[i]

      isPageBefore[firstPage] = {}

      for (let j = i + 1; j < pages.length; j++) {
        let secondPage = pages[j]
        isPageBefore[firstPage][secondPage] = true
      }
    }

    let trueUpdate = true

    for (let page of pages) {
      if (!rulesPerPage[page]) continue

      let rules = rulesPerPage[page]

      for (let rule of rules) {
        if (!isPageBefore[rule]) continue
        if (!isPageBefore[page][rule]) {
          trueUpdate = false
          break
        }
      }

      if (!trueUpdate) break
    }

    if (trueUpdate) trueUpdates.push(update)
  }

  let answer = 0

  for (let update of trueUpdates) {
    const pages = update.split(',')
    const medIdx = Math.floor(pages.length / 2)

    let midval = pages[medIdx]

    answer += parseInt(midval)
  }

  return answer
}

const solvePart2 = (input: string) => {
  const [rules, updates] = input.split('\n\n').map(r => r.split('\n'))

  const rulesPerPage = {}

  for (let rule of rules) {
    const [firstPage, secondPage] = rule.split('|')
    if (!rulesPerPage[firstPage]) rulesPerPage[firstPage] = []
    rulesPerPage[firstPage].push(secondPage)
  }

  let falseUpdates = []

  for (let k = 0; k < updates.length; k++) {
    let update = updates[k]
    const pages = update.split(',')

    const isPageBefore = {}

    for (let i = 0; i < pages.length; i++) {
      let firstPage = pages[i]

      isPageBefore[firstPage] = {}

      for (let j = i + 1; j < pages.length; j++) {
        let secondPage = pages[j]
        isPageBefore[firstPage][secondPage] = true
      }
    }

    let trueUpdate = true

    for (let page of pages) {
      if (!rulesPerPage[page]) continue

      let rules = rulesPerPage[page]

      for (let rule of rules) {
        if (!isPageBefore[rule]) continue
        if (!isPageBefore[page][rule]) {
          trueUpdate = false
          break
        }
      }

      if (!trueUpdate) {
        falseUpdates.push(update)
        break
      }
    }
  }

  let rearrangedPages: string[][] = []

  for (let update of falseUpdates) {
    let directedGraph = new Graph()
    let rearrangedUpdate = []

    const pages: string[] = update.split(',')

    const isPageInUpdate = {}

    for (let i = 0; i < pages.length; i++) {
      let firstPage = pages[i]

      isPageInUpdate[firstPage] = true
    }

    let pagesNotInGraph = new Set<string>()

    for (let page of pages) {
      pagesNotInGraph.add(page)
    }

    for (let page of pages) {
      if (!rulesPerPage[page]) continue

      let rules = rulesPerPage[page]

      for (let rule of rules) {
        if (isPageInUpdate[rule]) {
          directedGraph.addRule(page, rule)
          if (pagesNotInGraph.has(page)) pagesNotInGraph.delete(page)
          if (pagesNotInGraph.has(rule)) pagesNotInGraph.delete(rule)
        }
      }
    }

    for (let page of pagesNotInGraph.values()) {
      rearrangedUpdate.push(page)
    }
    rearrangedUpdate.push(...directedGraph.getRequiredPageOrder())

    rearrangedPages.push(rearrangedUpdate)
  }

  let answer = 0

  for (let pages of rearrangedPages) {
    const medIdx = Math.floor(pages.length / 2)

    let midval = pages[medIdx]

    answer += parseInt(midval)
  }

  return answer
}

const main = async () => {
  const input = await fetchInput()
  const inputExample = await fetchExample()

  console.log('\nPart 1 (example):', solvePart1(inputExample))
  console.log('\nPart 1:', solvePart1(input))

  console.log('\nPart 2 (example):', solvePart2(inputExample))
  console.log('\nPart 2:', solvePart2(input))
}

main()
