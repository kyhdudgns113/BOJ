// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, K] = inputArr[0].trim().split(' ').map(Number)

// 결과 배열
const resultArr = Array.from({length: 200001}).fill(200001)

// 이전 숫자 담는 배열
const prevArr = Array.from({length: 200001}).fill(-1)

// 결과 배열 초기화
resultArr[N] = 0

// BFS 용 방문큐. 배열로 선언
const visitQueue = Array.from({length: 200001}).fill(0)
let nowIdx = 0
let insertIdx = 0

// 시작지점을 먼저 넣는다.
visitQueue[insertIdx++] = N

// BFS 연산을 수행한다.
while (nowIdx < insertIdx) {
  const now = visitQueue[nowIdx++]
  const nowRes = resultArr[now]

  // now - 1 방문을 시도한다.
  if (now > 0 && resultArr[now - 1] > nowRes + 1) {
    resultArr[now - 1] = nowRes + 1
    prevArr[now - 1] = now
    visitQueue[insertIdx++] = now - 1
  }

  // now + 1 방문을 시도한다.
  if (now < 200000 && resultArr[now + 1] > nowRes + 1) {
    resultArr[now + 1] = nowRes + 1
    prevArr[now + 1] = now
    visitQueue[insertIdx++] = now + 1
  }

  // 2 * now 방문을 시도한다.
  if (now < 100000 && resultArr[2 * now] > nowRes + 1) {
    resultArr[2 * now] = nowRes + 1
    prevArr[2 * now] = now
    visitQueue[insertIdx++] = 2 * now
  }
}

// 출력할 배열. 역순으로 넣는다.
const printArr = []

let now = K

while (now !== -1) {
  printArr.push(now)
  now = prevArr[now]
}

// 배열을 뒤집는다.
printArr.reverse()

// 출력
process.stdout.write(`${printArr.length - 1}\n`)
process.stdout.write(`${printArr.join(' ')}`)
