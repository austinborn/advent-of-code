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
