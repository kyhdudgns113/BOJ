// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
let T = +inputArr[0]
let inputIdx = 1

// 출력 변수
let resultStr = ''

// N, M, K. 쿼리마다 갱신함
let N, M, K

// 농장 배열. 쿼리마다 갱신함
let farm = []

// 방문여부 배열. 쿼리마다 갱신함
let isVisit = []

while (T--) {
  const [m, n, k] = inputArr[inputIdx++].trim().split(' ').map(Number)

  N = n
  M = m
  K = k

  farm = Array.from({length: N}, () => Array.from({length: M}).fill(0))

  for (let i = 0; i < K; i++) {
    const [X, Y] = inputArr[inputIdx++].trim().split(' ').map(Number)
    farm[Y][X] = 1
  }

  isVisit = Array.from({length: N}, () => Array.from({length: M}).fill(false))

  let result = 0
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (farm[row][col] === 1 && !isVisit[row][col]) {
        result++
        dfs(row, col)
      }
    }
  }
  resultStr += result + '\n'
}

// 출력
process.stdout.write(resultStr)

function dfs(row, col) {
  isVisit[row][col] = true

  if (row > 0 && farm[row - 1][col] === 1 && !isVisit[row - 1][col]) {
    dfs(row - 1, col)
  }
  if (row < N - 1 && farm[row + 1][col] === 1 && !isVisit[row + 1][col]) {
    dfs(row + 1, col)
  }
  if (col > 0 && farm[row][col - 1] === 1 && !isVisit[row][col - 1]) {
    dfs(row, col - 1)
  }
  if (col < M - 1 && farm[row][col + 1] === 1 && !isVisit[row][col + 1]) {
    dfs(row, col + 1)
  }
}
