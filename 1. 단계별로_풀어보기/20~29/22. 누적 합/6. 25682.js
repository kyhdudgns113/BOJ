// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M, K] = inputArr[0].trim().split(' ').map(Number)
const board = inputArr.slice(1).map(row => row.trim().split(''))

// W로 시작하는것 기준, 바뀌어야 하는지 여부 배열
const okArr = Array.from({length: N}, () => Array.from({length: M}).fill(0))

// okArr 연산
for (let row = 0; row < N; row++) {
  for (let col = 0; col < M; col++) {
    if ((row + col) % 2 === 0) {
      okArr[row][col] = board[row][col] === 'B' ? 1 : 0
    } // ::
    else {
      okArr[row][col] = board[row][col] === 'W' ? 1 : 0
    }
  }
}

// 누적합 배열 생성
const sumArr = Array.from({length: N + 1}, () => Array.from({length: M + 1}).fill(0))

// 누적합 배열 연산
for (let row = 1; row <= N; row++) {
  for (let col = 1; col <= M; col++) {
    sumArr[row][col] = okArr[row - 1][col - 1] + sumArr[row - 1][col] + sumArr[row][col - 1] - sumArr[row - 1][col - 1]
  }
}

// 결과값 구하기
let result = K * K
for (let row = K; row <= N; row++) {
  for (let col = K; col <= M; col++) {
    const nowSum = sumArr[row][col] - sumArr[row - K][col] - sumArr[row][col - K] + sumArr[row - K][col - K]
    result = Math.min(result, nowSum, K * K - nowSum)
  }
}

// 출력
process.stdout.write(`${result}`)
