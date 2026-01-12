// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [A, B] = inputArr[0].split(' ').map(Number)

// 결과 저장
const result = Math.floor((A * B) / GCD(Math.max(A, B), Math.min(A, B)))

// 결과 출력
process.stdout.write(`${result}`)

function GCD(bigger, lower) {
  if (bigger % lower === 0) {
    return lower
  }

  return GCD(lower, bigger % lower)
}
