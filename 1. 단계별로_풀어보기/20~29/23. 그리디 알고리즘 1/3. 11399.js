// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const P = inputArr[1].trim().split(' ').map(Number)

// 시간이 작은것부터 앞으로 오도록 정렬
P.sort((a, b) => a - b)

// 결과 변수
let result = 0

// 그리디 연산
P.forEach((val, idx) => (result += val * (N - idx)))

// 출력
process.stdout.write(`${result}`)
