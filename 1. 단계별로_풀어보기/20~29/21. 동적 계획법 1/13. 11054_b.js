// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const A = inputArr[1].split(' ').map(Number)

// 결과 배열
const incArr = Array.from({length: N}).fill(1)
const decArr = Array.from({length: N}).fill(1)

// Bottom-Up 연산 1: 증가하는 수열 길이 구하기
for (let now = 1; now < N; now++) {
  for (let prev = 0; prev < now; prev++) {
    if (A[prev] < A[now]) {
      incArr[now] = Math.max(incArr[now], incArr[prev] + 1)
    }
  }
}

// Bottom-Up 연산 2: 감소하는 수열 길이 구하기
for (let now = N - 2; now >= 0; now--) {
  for (let next = now + 1; next < N; next++) {
    if (A[next] < A[now]) {
      decArr[now] = Math.max(decArr[now], decArr[next] + 1)
    }
  }
}

// 바이토닉 배열 구하기
const bitonicArr = Array.from({length: N}).map((_, idx) => incArr[idx] + decArr[idx] - 1)

// 결과 구하기
const result = Math.max(...bitonicArr)

// 출력
process.stdout.write(`${result}`)