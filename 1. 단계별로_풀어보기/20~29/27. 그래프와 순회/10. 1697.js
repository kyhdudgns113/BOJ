// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, K] = inputArr[0].trim().split(' ').map(Number)

// 최단거리를 저장할 배열
const resultArr = Array.from({length: 200002}).fill(null)

resultArr[N] = 0

// 다음번 방문할 숫자들을 저장할 Queue 역할
const visitQueue = Array.from({length: 200002}).fill(null)
let nowIdx = 0
let insertIdx = 0

// 시작지점 Queue 에 삽입
visitQueue[insertIdx++] = N

// 비재귀 BFS 연산
while (nowIdx < insertIdx) {
  const now = visitQueue[nowIdx++]
  const nowDist = resultArr[now]

  if (now > 0 && resultArr[now - 1] === null) {
    resultArr[now - 1] = nowDist + 1
    visitQueue[insertIdx++] = now - 1
  }
  if (now < 200000 && resultArr[now + 1] === null) {
    resultArr[now + 1] = nowDist + 1
    visitQueue[insertIdx++] = now + 1
  }
  if (now < 100001 && resultArr[2 * now] === null) {
    resultArr[2 * now] = nowDist + 1
    visitQueue[insertIdx++] = 2 * now
  }
}

process.stdout.write(`${resultArr[K]}`)
