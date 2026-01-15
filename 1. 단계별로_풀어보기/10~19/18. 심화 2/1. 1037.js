// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const numFactor = +inputArr[0]
const factorArr = inputArr[1].split(' ').map(Number)

// 약수 배열 정렬
factorArr.sort((a, b) => a - b)

// 결과 계산
const N = factorArr[0] * factorArr[factorArr.length - 1]

// 결과 출력
process.stdout.write(`${N}`)
