import { fetchExample, fetchInput, withTime } from '../../utils'

/*
pA * a.x + pB * b.x = p.x
pA * a.x = (p.x - (pB * b.x)) / a.x

pA * a.y + pB * b.y = p.y
(p.x - (pB * b.x)) * a.y / a.x + pB * b.y = p.y

(p.x * a.y / a.x) - pB * (b.x * a.y / a.x) + pB * b.y = p.y
(p.x * a.y / a.x) + pB * (b.y - (b.x * a.y / a.x)) = p.y
pB * (b.y - (b.x * a.y / a.x)) = p.y - (p.x * a.y / a.x)
pB = (p.y - (p.x * a.y / a.x)) / (b.y - (b.x * a.y / a.x))
*/

const INT_BOUNDS = 0.001
const P2_CONST = 10000000000000

const isInt = (num: number) => (
  (num <= Math.floor(num) + INT_BOUNDS) ||
  (num >= Math.ceil(num) - INT_BOUNDS)
)

const getButtonCoords = (a: string) => {
  const e = a.split(' ')
  return { x: parseInt(e[2].slice(2)), y: parseInt(e[3].slice(2)) }
}

const getPrizeCoords = (b: string) => {
  const e = b.split(' ')
  return { x: parseInt(e[1].slice(2, -1)), y: parseInt(e[2].slice(2)) }
}

const solvePart1 = (input: string) => {
  let machines = input.split("\n\n")

  let tokens = 0

  for (let machine of machines) {
    const [a, b, p] = machine.split('\n')
    const buttonA = getButtonCoords(a)
    const buttonB = getButtonCoords(b)
    const prize = getPrizeCoords(p)

    let bPress = (prize.y - (prize.x * buttonA.y / buttonA.x)) / (buttonB.y - (buttonB.x * buttonA.y / buttonA.x))
    if (!isInt(bPress)) continue

    let aPress = (prize.x - bPress * buttonB.x) / buttonA.x
    if (!isInt(aPress)) continue

    tokens += 3 * aPress + bPress
  }

  return tokens
}

const solvePart2 = (input: string) => {
  let machines = input.split("\n\n")

  let tokens = 0

  for (let machine of machines) {
    const [a, b, p] = machine.split('\n')
    const buttonA = getButtonCoords(a)
    const buttonB = getButtonCoords(b)
    const prize = getPrizeCoords(p)

    let bPress = (prize.y + P2_CONST - ((prize.x + P2_CONST) * buttonA.y / buttonA.x)) / (buttonB.y - (buttonB.x * buttonA.y / buttonA.x))
    if (!isInt(bPress)) continue

    let aPress = (prize.x + P2_CONST - bPress * buttonB.x) / buttonA.x
    if (!isInt(aPress)) continue

    tokens += 3 * aPress + bPress
  }

  return tokens
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
