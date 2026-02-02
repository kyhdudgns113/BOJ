// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].trim().split(' ').map(Number)
const maze = inputArr.slice(1).map(row => row.trim().split(''))

// 뱅문했는지 여부. 0이면 안함.
const isVisit = Array.from({length: N}, () => Array.from({length: M}).fill(0))

// BFS 용 Queue
const visitQueue = Array.from({length: 10002}, () => [])
let nowIdx = 0
let insertIdx = 0

// 시작점을 queue 에 넣는다.
isVisit[0][0] = 1
visitQueue[insertIdx++] = [1, [0, 0]]

// BFS 를 while 문으로 구현한다. (Node 재귀제한 걸릴 위험 있음)
while (nowIdx < insertIdx) {
  const [visitCnt, point] = visitQueue[nowIdx++]
  const [row, col] = point

  if (row > 0 && maze[row - 1][col] > 0 && isVisit[row - 1][col] === 0) {
    isVisit[row - 1][col] = visitCnt + 1
    visitQueue[insertIdx++] = [visitCnt + 1, [row - 1, col]]
  }
  if (row < N - 1 && maze[row + 1][col] > 0 && isVisit[row + 1][col] === 0) {
    isVisit[row + 1][col] = visitCnt + 1
    visitQueue[insertIdx++] = [visitCnt + 1, [row + 1, col]]
  }
  if (col > 0 && maze[row][col - 1] > 0 && isVisit[row][col - 1] === 0) {
    isVisit[row][col - 1] = visitCnt + 1
    visitQueue[insertIdx++] = [visitCnt + 1, [row, col - 1]]
  }
  if (col < M - 1 && maze[row][col + 1] > 0 && isVisit[row][col + 1] === 0) {
    isVisit[row][col + 1] = visitCnt + 1
    visitQueue[insertIdx++] = [visitCnt + 1, [row, col + 1]]
  }
}

// 결과 출력
process.stdout.write(`${isVisit[N - 1][M - 1]}`)
