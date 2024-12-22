import { fetchExample, fetchInput, withTime, getMod, getSum } from '../../utils'

const mixAndPrune = (num1: number, num2: number) => getMod(num1 ^ num2, 16777216)

const step1 = (num: number) => mixAndPrune(num, num * 64)

const step2 = (num: number) => mixAndPrune(num, Math.floor(num / 32))

const step3 = (num: number) => mixAndPrune(num, num * 2048)

const getNextSecret = (secret: number) => step3(step2(step1(secret)))

const solvePart1 = (input: string[], steps: number) => {
  let secrets = input.map(i => parseInt(i))
  while (steps > 0) {
    secrets = secrets.map(s => getNextSecret(s))
    steps -= 1
  }

  return getSum(secrets)
}

const solvePart2 = (input: string[], steps: number) => {
  let secrets = input.map(i => parseInt(i))
  const buyersPriceList = secrets.map(s => [s])
  while (steps > 0) {
    secrets = secrets.map(s => getNextSecret(s))
    for (let i = 0; i < secrets.length; i++) buyersPriceList[i].push(secrets[i])
    steps -= 1
  }

  const sequenceSum = {}
  let highest = 0

  for (let buyerPrices of buyersPriceList) {
    const buyerSum = {}
    for (let i = 4; i < buyerPrices.length; i++) {
      const prices = buyerPrices.slice(i-4, i+1).map(p => getMod(p, 10))

      const seq = [1, 2, 3, 4].map(i => prices[i] - prices[i-1]).join(',')
      if (buyerSum[seq] == undefined) {
        buyerSum[seq] = prices[4]
        sequenceSum[seq] = (sequenceSum[seq] ?? 0) + prices[4]
      }
      if (sequenceSum[seq] > highest) highest = sequenceSum[seq]
    }
  }

  return highest
}

const main = async () => {
  const input = (await fetchInput()).split('\n')
  const inputExample = (await fetchExample()).split('\n')
  const inputExample2 = (await fetchExample("inputExample2")).split('\n')

  console.log('\nPart 1 (example):', withTime(() => solvePart1(inputExample, 2000)))
  console.log('\nPart 1:', withTime(() => solvePart1(input, 2000)))

  console.log('\nPart 2 (example):', withTime(() => solvePart2(inputExample2, 2000)))
  console.log('\nPart 2:', withTime(() => solvePart2(input, 2000)))
}

main()
