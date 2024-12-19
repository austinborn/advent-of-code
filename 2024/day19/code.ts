import { fetchExample, fetchInput, withTime } from '../../utils'

const solvePart1 = (input: string) => {
  const [availablePatternsStr, desiredDesignsStr] = input.split('\n\n')

  const patterns = availablePatternsStr.split(', ')
  const designs = desiredDesignsStr.split('\n')

  const isPatternPossible = {}
  for (let pattern of patterns) {
    isPatternPossible[pattern] = true
  }

  let maxDesignLen = 0

  for (let design of designs) {
    if (design.length > maxDesignLen) maxDesignLen = design.length
  }

  const isDesignPossible = (design: string) => {
    if (!design.length) return false

    if (
      design.length <= maxDesignLen &&
      isPatternPossible[design] !== undefined
    ) return isPatternPossible[design]

    for (let n = design.length - 1; n > 0; n--) {
      let sliceA = design.slice(0, n)
      let sliceB = design.slice(n)
      if (isDesignPossible(sliceA) && isDesignPossible(sliceB)) {
        isPatternPossible[design] = true
        return true
      }
    }

    isPatternPossible[design] = false
    return false
  }

  let possibleDesigns = 0

  for (let design of designs) if (isDesignPossible(design)) possibleDesigns += 1
  return possibleDesigns
}

const solvePart2 = (input: string) => {
  const [availablePatternsStr, desiredDesignsStr] = input.split('\n\n')

  const patterns = availablePatternsStr.split(', ')
  const designs = desiredDesignsStr.split('\n')

  const isBasePattern = {}
  for (let pattern of patterns) {
    isBasePattern[pattern] = true
  }

  const designSolutionCount = {}

  let maxDesignLen = 0

  for (let design of designs) {
    if (design.length > maxDesignLen) maxDesignLen = design.length
  }

  const getSolutionsForDesign = (design: string) => {
    if (design.length == 0) return 1
    if (design.length > maxDesignLen) return 0

    if (designSolutionCount[design] !== undefined) return designSolutionCount[design]

    let count = 0

    for (let n = design.length; n > 0; n--) {
      let sliceA = design.slice(0, n)
      if (!isBasePattern[sliceA]) continue
      let sliceB = design.slice(n)

      count += getSolutionsForDesign(sliceB)
    }

    designSolutionCount[design] = count
    return count
  }

  let solutionsForDesign = 0

  for (let design of designs) solutionsForDesign += getSolutionsForDesign(design)
  return solutionsForDesign
}

const main = async () => {
  const input = (await fetchInput())
  const inputExample = (await fetchExample())

  console.log('\nPart 1 (example):', withTime(() => solvePart1(inputExample)))
  console.log('\nPart 1:', withTime(() => solvePart1(input)))

  console.log('\nPart 2 (example):', withTime(() => solvePart2(inputExample)))
  console.log('\nPart 2:', withTime(() => solvePart2(input)))
}

main()
