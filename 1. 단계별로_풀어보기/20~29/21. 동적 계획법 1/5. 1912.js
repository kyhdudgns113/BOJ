// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const numArr = inputArr[1].trim().split(' ').map(Number)

// 누적합 배열 생성
const accArr = Array.from({length: N + 1}, () => 0)

for (let i = 1; i <= N; i++) {
  accArr[i] = accArr[i - 1] + numArr[i - 1]
}

// minAcc[i] = accArr[0] ~ accArr[i - 1] 중에서 최소값
const minAcc = Array.from({length: N + 1}, () => 100000001)
for (let i = 1; i <= N; i++) {
  minAcc[i] = Math.min(minAcc[i - 1], accArr[i - 1])
}

let result = -100000001
for (let i = 1; i <= N; i++) {
  result = Math.max(result, accArr[i] - minAcc[i])
}

process.stdout.write(`${result}`)
