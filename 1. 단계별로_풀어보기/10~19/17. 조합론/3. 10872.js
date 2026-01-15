// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 결과 변수
let result = 1

// 연산
for (let i = 1; i <= N; i++) {
  result *= i
}

// 출력
process.stdout.write(`${result}`)
