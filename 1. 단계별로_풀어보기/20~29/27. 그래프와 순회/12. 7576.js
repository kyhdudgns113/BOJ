// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [M, N] = inputArr[0].trim().split(' ').map(Number)
const boxMatrix = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 며칠만에 익었는지 저장할 배열
const isVisit = Array.from({length: N}, () => Array.from({length: M}).fill(-1))

// BFS 용 큐 역할을 할 배열
const visitQueue = Array.from({length: 1000001}).fill([])
let nowIdx = 0
let insertIdx = 0

// 이미 익어있는 토마토들에 대한 연산(0일만에 익음 + 방문큐에 저장)
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    // 익은 토마토가 있거나 빈 공간은 0일만에 익었다고 간주한다.
    if (boxMatrix[i][j] === 1 || boxMatrix[i][j] === -1) {
      isVisit[i][j] = 0

      // 익은 토마토가 있는 공간만 방문해야 한다.
      if (boxMatrix[i][j] === 1) {
        visitQueue[insertIdx++] = [i, j]
      }
    }
  }
}

// 최대값 저장할 변수
let result = 0

while (nowIdx < insertIdx) {
  const [nowRow, nowCol] = visitQueue[nowIdx++]
  const nowDate = isVisit[nowRow][nowCol]

  result = Math.max(result, nowDate)

  if (nowRow > 0 && boxMatrix[nowRow - 1][nowCol] === 0 && isVisit[nowRow - 1][nowCol] === -1) {
    isVisit[nowRow - 1][nowCol] = nowDate + 1
    visitQueue[insertIdx++] = [nowRow - 1, nowCol]
  }
  if (nowRow < N - 1 && boxMatrix[nowRow + 1][nowCol] === 0 && isVisit[nowRow + 1][nowCol] === -1) {
    isVisit[nowRow + 1][nowCol] = nowDate + 1
    visitQueue[insertIdx++] = [nowRow + 1, nowCol]
  }
  if (nowCol > 0 && boxMatrix[nowRow][nowCol - 1] === 0 && isVisit[nowRow][nowCol - 1] === -1) {
    isVisit[nowRow][nowCol - 1] = nowDate + 1
    visitQueue[insertIdx++] = [nowRow, nowCol - 1]
  }
  if (nowCol < M - 1 && boxMatrix[nowRow][nowCol + 1] === 0 && isVisit[nowRow][nowCol + 1] === -1) {
    isVisit[nowRow][nowCol + 1] = nowDate + 1
    visitQueue[insertIdx++] = [nowRow, nowCol + 1]
  }
}

// 방문안한 칸의 갯수 구하는 부분
let howManyNull = isVisit.map(rowArr => rowArr.filter(val => val === -1).length).reduce((prev, val) => (prev += val), 0)

// 결과 출력
if (howManyNull > 0) {
  process.stdout.write('-1')
} // ::
else {
  process.stdout.write(`${result}`)
}
