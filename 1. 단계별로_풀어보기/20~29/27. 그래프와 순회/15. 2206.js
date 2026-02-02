// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].trim().split(' ').map(Number)
const mapInfo = inputArr.slice(1).map(row => row.trim().split('').map(Number))

// 현재 칸까지 최단거리를 저장할 배열
// 값이 1억이면 방문 안했다는 뜻이다.
// Math.min 을 쓰기 위해 큰 값을 넣었다.
// [row][col][drill] - drill: 0=드릴 사용함, 1=드릴 사용 안함
const isVisit = Array.from({length: N}, () => Array.from({length: M}, () => Array.from({length: 2}).fill(100000000)))

// BFS 용 방문큐를 배열로 선언한다.
const visitQueue = Array.from({length: 2000002}, () => [])
let nowIdx = 0
let insertIdx = 0

// 방문큐에 시작점의 정보를 입력한다.
visitQueue[insertIdx++] = [0, 0, 1] // [시작점의 row, 시작점의 col, 부술수 있는 벽의 갯수]
isVisit[0][0][1] = 1

// BFS 연산을 수행한다.
while (nowIdx < insertIdx) {
  const [nowRow, nowCol, numDrill] = visitQueue[nowIdx++]
  const nowVal = isVisit[nowRow][nowCol][numDrill]

  // 조건 1: 이동할 칸이 존재하냐? (인덱스 범위 확인)
  // 조건 2: 이동할 수 있냐? (벽이 없거나 드릴이 남았거나)
  // 위쪽
  if (nowRow > 0 && (mapInfo[nowRow - 1][nowCol] === 0 || numDrill > 0)) {
    const nextDrill = mapInfo[nowRow - 1][nowCol] === 0 ? numDrill : 0

    if (nowVal + 1 < isVisit[nowRow - 1][nowCol][nextDrill]) {
      visitQueue[insertIdx++] = [nowRow - 1, nowCol, nextDrill]
      isVisit[nowRow - 1][nowCol][nextDrill] = nowVal + 1
    }
  }
  // 아래쪽
  if (nowRow < N - 1 && (mapInfo[nowRow + 1][nowCol] === 0 || numDrill > 0)) {
    const nextDrill = mapInfo[nowRow + 1][nowCol] === 0 ? numDrill : 0

    if (nowVal + 1 < isVisit[nowRow + 1][nowCol][nextDrill]) {
      visitQueue[insertIdx++] = [nowRow + 1, nowCol, nextDrill]
      isVisit[nowRow + 1][nowCol][nextDrill] = nowVal + 1
    }
  }
  // 왼쪽
  if (nowCol > 0 && (mapInfo[nowRow][nowCol - 1] === 0 || numDrill > 0)) {
    const nextDrill = mapInfo[nowRow][nowCol - 1] === 0 ? numDrill : 0

    if (nowVal + 1 < isVisit[nowRow][nowCol - 1][nextDrill]) {
      visitQueue[insertIdx++] = [nowRow, nowCol - 1, nextDrill]
      isVisit[nowRow][nowCol - 1][nextDrill] = nowVal + 1
    }
  }
  // 오른쪽
  if (nowCol < M - 1 && (mapInfo[nowRow][nowCol + 1] === 0 || numDrill > 0)) {
    const nextDrill = mapInfo[nowRow][nowCol + 1] === 0 ? numDrill : 0

    if (nowVal + 1 < isVisit[nowRow][nowCol + 1][nextDrill]) {
      visitQueue[insertIdx++] = [nowRow, nowCol + 1, nextDrill]
      isVisit[nowRow][nowCol + 1][nextDrill] = nowVal + 1
    }
  }
}

const result = Math.min(isVisit[N - 1][M - 1][0], isVisit[N - 1][M - 1][1])
if (result === 100000000) {
  process.stdout.write(`-1\n`)
} // ::
else {
  process.stdout.write(`${result}\n`)
}
