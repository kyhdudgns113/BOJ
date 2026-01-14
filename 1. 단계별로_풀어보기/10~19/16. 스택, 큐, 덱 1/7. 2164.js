// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 거대한 배열 선언
const queueArr = Array.from({length: 1000001})
  .fill(0)
  .map((_, idx) => idx + 1)

let topIdx = 0
let endIdx = N

// 연산 N - 1 번 반복
for (let i = 0; i < N - 1; i++) {
  topIdx += 1
  queueArr[endIdx++] = queueArr[topIdx++]
}

// 결과 출력
const result = queueArr[topIdx]
process.stdout.write(`${result}`)
