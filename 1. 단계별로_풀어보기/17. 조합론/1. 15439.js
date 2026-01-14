// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 결과 계산
const result = N * (N - 1)

// 출력
process.stdout.write(`${result}`)
