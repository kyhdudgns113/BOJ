// 입력
const inputArr = require('fs').readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 수행 횟수
const resultTime = N

// 차수
const resultDim = 1

// 출력
process.stdout.write(`${resultTime}\n${resultDim}`)
