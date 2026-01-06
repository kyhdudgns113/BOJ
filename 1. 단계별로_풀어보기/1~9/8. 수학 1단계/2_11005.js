// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 입력 파싱
let [N, B] = inputArr[0].split(' ').map(Number)

// 결과 문자열
let result = ''

while (N > 0) {
  // 나머지를 구한다.
  const M = N % B

  // M이 숫자인지, 문자인지 판단하고 result 에 덧붙인다.
  if (M < 10) {
    result = M.toString() + result
  } //
  else {
    result = String.fromCharCode(M - 10 + 'A'.charCodeAt(0)) + result
  }

  N = Math.floor(N / B)
}

process.stdout.write(`${result}`)
