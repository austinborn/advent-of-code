export const getSum = (nums: number[]) => nums.reduce((sum, num) => sum += num, 0)

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

export const getFilledArray = (dims: number[], fill: any) => {
  const array = []
  for (let i = 0; i < dims[0]; i++) {
    const filler = dims.length > 1 ? getFilledArray(dims.slice(1), fill) : fill
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