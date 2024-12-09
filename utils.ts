import { existsSync, readFileSync, writeFileSync } from 'fs'
import { get as axiosGet } from 'axios'
import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

/////////////
// Helpers //
/////////////

export const getSum = (nums: number[]) => nums.reduce((sum, num) => sum + num, 0)

// O(n^2) instead of O(n log n)
export const getMaxes = (nums: number[], n: number) => nums.reduce((maxes, num) => {
  for (let i = 0; i < maxes.length; i++) {
    if (num > maxes[i]) {
      maxes.pop()
      maxes.splice(i, 0, num)
      break
    }
  }
  return maxes
}, Array(n).fill(0))

export const getFilledMatrix = (dims: number[], fill: any) => {
  const array = []
  for (let i = 0; i < dims[0]; i++) {
    const filler = dims.length > 1 ? getFilledMatrix(dims.slice(1), fill) : fill
    array.push(filler)
  }
  return array
}

export const getFactors = (num: number) => {
  if (num == 0) return [0,1]
  const factors = [1]
  let i = 2
  while (num > 1) {
    if (num % i === 0) {
      factors.push(i)
      num /= i
    } else {
      i++
    }
  }
  return factors
}

////////////////////
// Administrative //
////////////////////

export const fetchInput = async () => fetchText("/input", "input")

// Note: the regex below doesn't always work, just paste the example input manually in that case
export const fetchExample = async (filename?: string) => fetchText("", filename ?? "inputExample", /<code>(.|\n)*?<\/code>/)

export const fetchText = async (endpoint: string, fileName: string, regex?: RegExp) => {
  let year = process.argv[2]
  let day = process.argv[3]

  const filePath = `./${year}/day${day}/${fileName}.txt`

  if (!existsSync(filePath)) {
    let cookie = process.env.COOKIE
    if (!cookie) throw new Error("Requires COOKIE in .env")
    let { data, status }: { data: string, status: number } = await axiosGet(`https://adventofcode.com/${year}/day/${day}${endpoint}`, { headers: { Cookie: cookie } })

    if (status != 200) throw new Error(`Axios request failed with status: ${status}`)

    if (regex) {
      data = data.match(regex)[0]
      data = data.substring(6, data.length - 7)
    }

    const input = data.substring(0, data.length-1)

    writeFileSync(filePath, input)
    return input
  } else {
    return readFileSync(filePath, 'utf8')
  }
}

export const withTime = (cb: () => number) => {
  const start = Date.now()
  let answer = cb()
  return `${answer.toString()} (${(Date.now() - start)}ms)`
}