
import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { getSum, getMaxes } from '../../utils'

const main = async () => {
  console.log("Solving Puzzle:")
  const input = readFileSync('./2023/day2/input.txt', 'utf8')

  const games: string[] = input.split('\n')

  const total = games.reduce((sum: number, game: string) => {
    const rounds = game.replaceAll(' ', '').split(';')
    const valid = rounds.reduce((valid: boolean, round: string) => {
      const regexRed = round.match('(?<red>[0-9]*)red')
      const red = parseInt(regexRed?.groups?.red ?? '0')
      const regexGreen = round.match('(?<green>[0-9]*)green')
      const green = parseInt(regexGreen?.groups?.green ?? '0')
      const regexBlue = round.match('(?<blue>[0-9]*)blue')
      const blue = parseInt(regexBlue?.groups?.blue ?? '0')
      if (red > 12 || green > 13 || blue > 14) return false
      return valid && true
    }, true) //RGB
    if (valid) return sum + parseInt(rounds[0].match('Game(?<game>[0-9]*)')?.groups?.game)
    else return sum

  }, 0)

  console.log("Answer 1: ", total)

  const total2 = games.reduce((sum: number, game: string) => {
    const rounds = game.replaceAll(' ', '').split(';')
    const totals = rounds.reduce((totals, round) => {
      const regexRed = round.match('(?<red>[0-9]*)red')
      const red = parseInt(regexRed?.groups?.red ?? '0')
      const regexGreen = round.match('(?<green>[0-9]*)green')
      const green = parseInt(regexGreen?.groups?.green ?? '0')
      const regexBlue = round.match('(?<blue>[0-9]*)blue')
      const blue = parseInt(regexBlue?.groups?.blue ?? '0')
      return [Math.max(totals[0], red), Math.max(totals[1], green), Math.max(totals[2],blue)]
    }, [0,0,0]) //RGB

      return totals[0] * totals[1] * totals[2] + sum
  }, 0)
  

  console.log("Answer 2: ", total2)
}

main()
