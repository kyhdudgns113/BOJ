// 입력
const inputArr = require('fs').readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = BigInt(inputArr[0])

// 수행 횟수
const resultTime = (N * (N - 1n) * (N - 2n)) / 6n

// 차수
const resultDim = 3

// 출력
process.stdout.write(`${resultTime}\n${resultDim}`)
