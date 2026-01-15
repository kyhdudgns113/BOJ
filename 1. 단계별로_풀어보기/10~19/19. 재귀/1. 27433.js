// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

process.stdout.write(`${factorial(N)}`)

function factorial(n) {
  if (n < 1) return 1

  return n * factorial(n - 1)
}
