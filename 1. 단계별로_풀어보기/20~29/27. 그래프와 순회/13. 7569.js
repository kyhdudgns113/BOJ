// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [M, N, H] = inputArr[0].trim().split(' ').map(Number)
const box = Array.from({length: H}, (_, h) => inputArr.slice(1 + h * N, 1 + (h + 1) * N).map(line => line.trim().split(' ').map(Number)))

// 몇번째로 방문했는지 저장할 배열
// 방문 안했으면 -1로 한다
const isVisit = Array.from({length: H}, () => Array.from({length: N}, () => Array.from({length: M}).fill(-1)))

// BFS 용 방문큐 역할을 할 배열
// 각 칸을 최대 한번까지 방문하기 때문에 1,000,000 으로 설정한다.
const visitQueue = Array.from({length: 1000001}).fill(null)
let nowIdx = 0
let insertIdx = 0
let remainSpace = H * N * M

// 익은 토마토, 빈공간은 0번째로 익었다고 간주한다.
for (let h = 0; h < H; h++) {
  for (let n = 0; n < N; n++) {
    for (let m = 0; m < M; m++) {
      if (box[h][n][m] === -1) {
        remainSpace--
        isVisit[h][n][m] = 0
      } // ::
      else if (box[h][n][m] === 1) {
        isVisit[h][n][m] = 0
        visitQueue[insertIdx++] = [h, n, m]
      }
    }
  }
}

let result = 0

// BFS 연산 수행
while (nowIdx < insertIdx) {
  const [nowH, nowN, nowM] = visitQueue[nowIdx++]
  const nowVal = isVisit[nowH][nowN][nowM]

  remainSpace--

  result = Math.max(result, nowVal)

  // 아래쪽 층
  if (nowH > 0 && box[nowH - 1][nowN][nowM] === 0 && isVisit[nowH - 1][nowN][nowM] === -1) {
    isVisit[nowH - 1][nowN][nowM] = nowVal + 1
    visitQueue[insertIdx++] = [nowH - 1, nowN, nowM]
  }
  // 위쪽 층
  if (nowH < H - 1 && box[nowH + 1][nowN][nowM] === 0 && isVisit[nowH + 1][nowN][nowM] === -1) {
    isVisit[nowH + 1][nowN][nowM] = nowVal + 1
    visitQueue[insertIdx++] = [nowH + 1, nowN, nowM]
  }
  // 뒤쪽 (n 감소)
  if (nowN > 0 && box[nowH][nowN - 1][nowM] === 0 && isVisit[nowH][nowN - 1][nowM] === -1) {
    isVisit[nowH][nowN - 1][nowM] = nowVal + 1
    visitQueue[insertIdx++] = [nowH, nowN - 1, nowM]
  }
  // 앞쪽 (n 증가)
  if (nowN < N - 1 && box[nowH][nowN + 1][nowM] === 0 && isVisit[nowH][nowN + 1][nowM] === -1) {
    isVisit[nowH][nowN + 1][nowM] = nowVal + 1
    visitQueue[insertIdx++] = [nowH, nowN + 1, nowM]
  }
  // 왼쪽 (m 감소)
  if (nowM > 0 && box[nowH][nowN][nowM - 1] === 0 && isVisit[nowH][nowN][nowM - 1] === -1) {
    isVisit[nowH][nowN][nowM - 1] = nowVal + 1
    visitQueue[insertIdx++] = [nowH, nowN, nowM - 1]
  }
  // 오른쪽 (m 증가)
  if (nowM < M - 1 && box[nowH][nowN][nowM + 1] === 0 && isVisit[nowH][nowN][nowM + 1] === -1) {
    isVisit[nowH][nowN][nowM + 1] = nowVal + 1
    visitQueue[insertIdx++] = [nowH, nowN, nowM + 1]
  }
}
if (remainSpace > 0) {
  process.stdout.write('-1')
} // ::
else {
  process.stdout.write(`${result}`)
}
