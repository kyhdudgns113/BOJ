// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, S] = inputArr[0].trim().split(' ').map(Number)
const numArr = inputArr[1].trim().split(' ').map(Number)

// 누적합 배열
const sumArr = Array.from({length: N + 1}).fill(0)

for (let i = 1; i <= N; i++) {
  sumArr[i] = sumArr[i - 1] + numArr[i - 1]
}

// 가장 짧은 길이를 저장할 변수.
// 초기값으로는 이론상 최대값보다 큰 N + 1 로 설정
let minDist = N + 1

// 양 끝 포인터
// 누적합 배열을 가리키기 때문에 0과 N 으로 설정한다.
let left = 0
let right = 1

while (left < right && right <= N) {
  const rangeSum = sumArr[right] - sumArr[left]

  if (S <= rangeSum) {
    minDist = Math.min(minDist, right - left)
  }

  if (S > rangeSum || left + 1 === right) {
    right++
  } // ::
  else {
    left++
  }
}

process.stdout.write(`${minDist === N + 1 ? 0 : minDist}`)
