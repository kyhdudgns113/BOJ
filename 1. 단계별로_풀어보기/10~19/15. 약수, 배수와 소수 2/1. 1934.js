// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const T = +inputArr[0]
const testCases = inputArr.slice(1).map(row => row.split(' ').map(Number))

testCases.forEach(row => {
  const [A, B] = row

  const gcd = GCD(Math.max(A, B), Math.min(A, B))
  const gcp = Math.floor((A * B) / gcd)

  process.stdout.write(`${gcp}\n`)
})

function GCD(bigger, lower) {
  if (bigger % lower === 0) {
    return lower
  }

  return GCD(lower, bigger % lower)
}
