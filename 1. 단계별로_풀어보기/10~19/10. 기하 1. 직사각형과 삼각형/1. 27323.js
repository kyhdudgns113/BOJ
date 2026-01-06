// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
A = +inputArr[0]
B = +inputArr[1]

// 결과 출력
process.stdout.write(`${A * B}`)
