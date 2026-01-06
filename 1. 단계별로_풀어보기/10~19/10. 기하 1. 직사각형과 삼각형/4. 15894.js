// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 결과값
const result = 4 * N

// 출력
process.stdout.write(`${result}`)
