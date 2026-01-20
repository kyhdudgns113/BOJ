// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 결과 저장할 변수
const dp = Array.from({length: N + 1}, () => 0)
dp[0] = 1
dp[1] = 1

// 점화식 역연산
for (let i = 2; i <= N; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % 15746
}

// 출력
process.stdout.write(`${dp[N]}`)
