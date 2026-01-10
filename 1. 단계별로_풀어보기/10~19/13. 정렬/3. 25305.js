// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, K] = inputArr[0].split(' ').map(Number)
const scoreArr = inputArr[1].split(' ').map(Number)

// 내림차순 정렬
scoreArr.sort((a, b) => b - a)

// 결과값 구하기
const result = scoreArr[K - 1]

// 출력
process.stdout.write(`${result}`)
