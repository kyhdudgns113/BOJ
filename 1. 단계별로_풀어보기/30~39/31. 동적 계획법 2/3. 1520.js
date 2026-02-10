// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [M, N] = inputArr[0].trim().split(' ').map(Number)
const mapMatrix = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 결과 배열
const resultArr = Array.from({length: M}, () => Array.from({length: N}).fill(0))

// 초기값. 시작점에서 시작점까지 가는 경우의 수는 1이다.
resultArr[0][0] = 1

// remainArr[r][c] : (r, c) 보다 높은 인접한 칸 중에서 아직 연산이 안 된 칸의 갯수
const remainArr = Array.from({length: M}, () => Array.from({length: N}).fill(0))

// remainArr 를 구한다.
for (let row = 0; row < M; row++) {
  for (let col = 0; col < N; col++) {
    const now = mapMatrix[row][col]

    if (row > 0 && now < mapMatrix[row - 1][col]) {
      remainArr[row][col]++
    }
    if (col > 0 && now < mapMatrix[row][col - 1]) {
      remainArr[row][col]++
    }
    if (row < M - 1 && now < mapMatrix[row + 1][col]) {
      remainArr[row][col]++
    }
    if (col < N - 1 && now < mapMatrix[row][col + 1]) {
      remainArr[row][col]++
    }
  }
}

// 방문큐, 배열로 선언한다.
const visitQueue = Array.from({length: N * M}).fill(null)
let nowIdx = 0
let insertIdx = 0

// 본인과 인접한 칸 중 본인보다 큰게 없는 칸들을 넣는다.
for (let row = 0; row < M; row++) {
  for (let col = 0; col < N; col++) {
    if (remainArr[row][col] === 0) {
      visitQueue[insertIdx++] = [row, col]
    }
  }
}

// 위상정렬 연산을 수행한다.
while (nowIdx < insertIdx) {
  const [nowRow, nowCol] = visitQueue[nowIdx++]

  const nowHeight = mapMatrix[nowRow][nowCol]
  const nowVal = resultArr[nowRow][nowCol]

  // 상하좌우 중에서 본인보다 낮은 칸들의 경우의수를 늘려준다.
  // 각각 remainArr 값도 1 빼주면서 0이 된 경우 방문큐에 넣는다.
  if (nowRow > 0 && nowHeight > mapMatrix[nowRow - 1][nowCol]) {
    resultArr[nowRow - 1][nowCol] += nowVal
    remainArr[nowRow - 1][nowCol]--
    if (remainArr[nowRow - 1][nowCol] === 0) {
      visitQueue[insertIdx++] = [nowRow - 1, nowCol]
    }
  }
  if (nowRow < M - 1 && nowHeight > mapMatrix[nowRow + 1][nowCol]) {
    resultArr[nowRow + 1][nowCol] += nowVal
    remainArr[nowRow + 1][nowCol]--
    if (remainArr[nowRow + 1][nowCol] === 0) {
      visitQueue[insertIdx++] = [nowRow + 1, nowCol]
    }
  }
  if (nowCol > 0 && nowHeight > mapMatrix[nowRow][nowCol - 1]) {
    resultArr[nowRow][nowCol - 1] += nowVal
    remainArr[nowRow][nowCol - 1]--
    if (remainArr[nowRow][nowCol - 1] === 0) {
      visitQueue[insertIdx++] = [nowRow, nowCol - 1]
    }
  }
  if (nowCol < N - 1 && nowHeight > mapMatrix[nowRow][nowCol + 1]) {
    resultArr[nowRow][nowCol + 1] += nowVal
    remainArr[nowRow][nowCol + 1]--
    if (remainArr[nowRow][nowCol + 1] === 0) {
      visitQueue[insertIdx++] = [nowRow, nowCol + 1]
    }
  }
}

// 결과 출력
process.stdout.write(`${resultArr[M - 1][N - 1]}`)
