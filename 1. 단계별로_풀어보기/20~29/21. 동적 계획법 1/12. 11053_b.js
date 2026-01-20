// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const A = inputArr[1].split(' ').map(Number)

// 결과 배열
const resultArr = Array.from({length: N + 1}, () => 1)

// Bottom-Up 연산: O(N^2)
// now 이전의 숫자들 중에서 A[now] 보다 작은것중 result 의 최대값을 구한다.
for (let now = 1; now < N; now++) {
  let maxLen = 0
  for (let prev = now - 1; prev >= 0; prev--) {
    if (A[prev] < A[now]) {
      maxLen = Math.max(maxLen, resultArr[prev])
    }
  }
  resultArr[now] = maxLen + 1
}

// 최대값 구하기
const result = Math.max(...resultArr)

// 출력
process.stdout.write(`${result}`)