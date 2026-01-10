// 입력
const inputArr = require('fs').readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const numArr = inputArr.map(Number)

// 정렬
numArr.sort()

// 합 계산
const sumNumbers = numArr.reduce((prev, value) => prev += value, 0)

// 평균
const average = Math.floor(sumNumbers / 5)

// 출력
process.stdout.write(`${average}\n${numArr[2]}`)