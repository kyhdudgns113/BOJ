// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, K] = inputArr[0].split(' ').map(Number)

// 결과 변수
let result = 1

// 이항계수 계산
for (let i = N; i >= N - K + 1; i--) {
  result *= i
}

for (let i = 1; i <= K; i++) {
  result /= i
}

result = Math.floor(result)

// 출력
process.stdout.write(`${result}`)
