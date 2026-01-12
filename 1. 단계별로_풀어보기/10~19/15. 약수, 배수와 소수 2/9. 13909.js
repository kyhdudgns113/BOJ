// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 제곱근 구하기
const sqrtN = Math.floor(Math.sqrt(N))

// 결과 출력
const result = sqrtN

process.stdout.write(`${result}`)
