// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 피보나치 수 저장
const fiboArr = Array.from({length: N + 1}).fill(0)

fiboArr[1] = 1
fiboArr[2] = 1

// 피보나치 연산
for (let i = 3; i <= N; i++) {
  fiboArr[i] = fiboArr[i - 1] + fiboArr[i - 2]
}

// 두 결과값을 변수화. 가독성을 위함
const code1 = fiboArr[N]
const code2 = N - 2

// 출력
process.stdout.write(`${code1} ${code2}`)
