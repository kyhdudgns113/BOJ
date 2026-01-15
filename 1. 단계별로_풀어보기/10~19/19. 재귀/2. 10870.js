// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

function fibonacci(n) {
  if (n === 0) return 0

  if (n === 1) return 1

  return fibonacci(n - 1) + fibonacci(n - 2)
}

process.stdout.write(`${fibonacci(N)}`)
