// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 가로 점 갯수 계산
const width = Math.pow(2, N) + 1

// 점 갯수 계산
const result = width * width

// 출력
process.stdout.write(`${result}`)
