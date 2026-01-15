// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const T = +inputArr[0]
const testArr = inputArr.slice(1).map(row => row.split(' ').map(Number))

// nCk 를 미리 계산
const nCk = Array.from({length: 31}).map((_, idx) => Array.from({length: 31}).fill(0))

nCk[0][0] = 1

for (let n = 0; n <= 29; n++) {
  for (let k = 0; k <= n; k++) {
    nCk[n + 1][k] += nCk[n][k]
    nCk[n + 1][k + 1] += nCk[n][k]
  }
}

// 출력 변수
let resultStr = ''

// 테스트 케이스마다 연산
testArr.forEach(test => {
  const [K, N] = test

  resultStr += nCk[N][K] + '\n'
})

// 출력
process.stdout.write(resultStr)
