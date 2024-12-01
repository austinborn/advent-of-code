
import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { getSum, getMaxes } from '../../utils'
import BigNumber from 'bignumber.js'

// Decimal.set({ precision: 100, rounding: 0 })
// BNNum.set({ DECIMAL_PLACES: 100 })

const BNNum = BigNumber.clone({ DECIMAL_PLACES: 100, POW_PRECISION: 100, RANGE: 100, EXPONENTIAL_AT: 100 })

const main = async () => {
  console.log("Solving Puzzle:")
  const input = readFileSync('./2023/day4/input.txt', 'utf8')

  const cards = input.split('\n')
  let sum = 0

  let cardIdx = 0
  const numCopies: {[num: number]: BigNumber} = {}
  const counts = {}

  for (const card of cards) {
    const regex = card.match('Card( |[0-9])+\: (?<winning>([0-9]| )+)\\|(?<list>([0-9]| )+)')
    const { winning, list } = regex.groups
    const winningSplit = winning.split(' ').filter(n => parseInt(n) > 0)
    const winningDict = {}
    for (const winningNum of winningSplit) {
      winningDict[winningNum] = true
    }
    const listSplit = list.split(' ').filter(n => parseInt(n) > 0)
    const count = listSplit.reduce((total, listNum) => {
      if (winningDict[listNum]) total += 1
      return total
    }, 0)
    counts[cardIdx] = count
    if (count == 0) {
      cardIdx += 1
      continue
    }
    const winningTotal = 1 * 2**(count - 1)
    sum += winningTotal
    for (let j = cardIdx + 1; j < cardIdx + 1 + count; j++) {
      let newCopies = numCopies[cardIdx] || new BNNum(0)
      newCopies = newCopies.plus(new BNNum(1))
      if (!numCopies[j]) numCopies[j] = new BNNum(0)
      numCopies[j] = numCopies[j].plus(newCopies)
    }
    cardIdx += 1
  }

  let totalCards = new BNNum(cards.length)
  for (let i = 0; i < cards.length; i++) {
    const cardCopies = numCopies[i] || new BNNum(0)
    console.log({i, count: counts[i] || 0, numCopies: cardCopies.toString()})
    totalCards = totalCards.plus(cardCopies)
  }

  console.log("Answer 1: ", sum)

  console.log("Answer 2: ", totalCards.toString())
}

main()
