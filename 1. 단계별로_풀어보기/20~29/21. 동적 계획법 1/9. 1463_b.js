// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 결과 배열
const resultArr = Array.from({length: N + 1}).map((_, idx) => idx + 2)

// 초기값 연산
resultArr[1] = 0

// Bottom-Up 연산
for (let i = 1; i < N; i++) {
  if (3 * i <= N) {
    resultArr[3 * i] = Math.min(resultArr[3 * i], resultArr[i] + 1)
  }

  if (2 * i <= N) {
    resultArr[2 * i] = Math.min(resultArr[2 * i], resultArr[i] + 1)
  }

  resultArr[i + 1] = Math.min(resultArr[i + 1], resultArr[i] + 1)
}

// 결과 구하기
const result = resultArr[N]

// 출력
process.stdout.write(`${result}`)
