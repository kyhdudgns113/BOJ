// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const lenArr = inputArr[0].trim().split(' ').map(Number)

const [A, B, C] = lenArr.sort((a, b) => a - b)

let result = 0

if (A + B <= C) result = 2 * (A + B) - 1
else result = A + B + C

process.stdout.write(`${result}`)
