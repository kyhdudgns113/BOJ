// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const T = +inputArr[0]
const queryArr = inputArr
  .slice(1)
  .map((row, rowIdx) => {
    if (rowIdx % 3 === 0) {
      return [row, inputArr[rowIdx + 2].trim().split(' ').map(Number), inputArr[rowIdx + 3].trim().split(' ').map(Number)]
    } // ::
    else {
      return null
    }
  })
  .filter(row => row !== null)

// 글로벌 변수
let L = 0
let isVisit = []

let visitQueue = Array.from({length: 90001}).fill(0)
let nowIdx = 0
let insertIdx = 0

// 쿼리마다 연산 수행
queryArr.forEach(query => {
  const [l, start, end] = query

  L = l
  const [startX, startY] = start
  const [endX, endY] = end

  isVisit = Array.from({length: L}, () => Array.from({length: L}).fill(false))

  isVisit[startX][startY] = 0

  nowIdx = 0
  insertIdx = 0
  visitQueue[insertIdx++] = [startX, startY]

  // BFS 연산
  while (nowIdx < insertIdx) {
    const [nowX, nowY] = visitQueue[nowIdx++]
    const nowDist = isVisit[nowX][nowY]

    if (nowY >= 2) {
      if (nowX >= 1 && isVisit[nowX - 1][nowY - 2] === false) {
        isVisit[nowX - 1][nowY - 2] = nowDist + 1
        visitQueue[insertIdx++] = [nowX - 1, nowY - 2]
      }
      if (nowX < L - 1 && isVisit[nowX + 1][nowY - 2] === false) {
        isVisit[nowX + 1][nowY - 2] = nowDist + 1
        visitQueue[insertIdx++] = [nowX + 1, nowY - 2]
      }
    }
    if (nowY >= 1) {
      if (nowX >= 2 && isVisit[nowX - 2][nowY - 1] === false) {
        isVisit[nowX - 2][nowY - 1] = nowDist + 1
        visitQueue[insertIdx++] = [nowX - 2, nowY - 1]
      }
      if (nowX < L - 2 && isVisit[nowX + 2][nowY - 1] === false) {
        isVisit[nowX + 2][nowY - 1] = nowDist + 1
        visitQueue[insertIdx++] = [nowX + 2, nowY - 1]
      }
    }
    if (nowY < L - 1) {
      if (nowX >= 2 && isVisit[nowX - 2][nowY + 1] === false) {
        isVisit[nowX - 2][nowY + 1] = nowDist + 1
        visitQueue[insertIdx++] = [nowX - 2, nowY + 1]
      }
      if (nowX < L - 2 && isVisit[nowX + 2][nowY + 1] === false) {
        isVisit[nowX + 2][nowY + 1] = nowDist + 1
        visitQueue[insertIdx++] = [nowX + 2, nowY + 1]
      }
    }
    if (nowY < L - 2) {
      if (nowX >= 1 && isVisit[nowX - 1][nowY + 2] === false) {
        isVisit[nowX - 1][nowY + 2] = nowDist + 1
        visitQueue[insertIdx++] = [nowX - 1, nowY + 2]
      }
      if (nowX < L - 1 && isVisit[nowX + 1][nowY + 2] === false) {
        isVisit[nowX + 1][nowY + 2] = nowDist + 1
        visitQueue[insertIdx++] = [nowX + 1, nowY + 2]
      }
    }
  }

  process.stdout.write(`${isVisit[endX][endY]}\n`)
})
