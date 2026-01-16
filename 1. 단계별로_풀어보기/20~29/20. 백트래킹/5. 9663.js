// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 방문 여부 저장
const isVisit = Array.from({length: N}).map(_ => Array.from({length: N}).fill(0))

// 결과 변수
let result = 0

for (let col = 0; col < N; col++) {
  recurse(0, col)
}

process.stdout.write(`${result}`)

// row 를 1씩 증가시킨다.
function recurse(nowRow, nowCol) {
  if (nowRow === N - 1) {
    result += 1
    return
  }

  // 이후 row 중에서 queen 을 배치 못하는 포인트를 체크
  for (let deltaRow = 1; nowRow + deltaRow < N; deltaRow++) {
    if (nowCol - deltaRow >= 0) {
      isVisit[nowRow + deltaRow][nowCol - deltaRow] += 1
    }

    if (nowCol + deltaRow < N) {
      isVisit[nowRow + deltaRow][nowCol + deltaRow] += 1
    }

    isVisit[nowRow + deltaRow][nowCol] += 1
  }

  const nextRow = nowRow + 1

  // 갈 수 있는 다음 포인트를 탐색
  for (let nextCol = 0; nextCol < N; nextCol++) {
    if (isVisit[nextRow][nextCol] === 0) {
      isVisit[nextRow][nextCol] = 1
      recurse(nextRow, nextCol)
      isVisit[nextRow][nextCol] = 0
    }
  }

  // 이후 row 중에서 queen 을 배치 못하는 포인트를 체크
  for (let deltaRow = 1; nowRow + deltaRow < N; deltaRow++) {
    if (nowCol - deltaRow >= 0) {
      isVisit[nowRow + deltaRow][nowCol - deltaRow] -= 1
    }

    if (nowCol + deltaRow < N) {
      isVisit[nowRow + deltaRow][nowCol + deltaRow] -= 1
    }

    isVisit[nowRow + deltaRow][nowCol] -= 1
  }
}
