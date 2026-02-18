// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const W = +inputArr[1]
const workArr = inputArr.slice(2).map(inputRow => inputRow.trim().split(' ').map(Number))

// resultArr[i][j] = (i - 1, j - 1) 에서의 최소 이동거리
const resultArr = Array.from({length: W + 1}, () => Array.from({length: W + 1}).fill(20000000))
resultArr[0][0] = 0

const prevArr = Array.from({length: W + 1}, () => Array.from({length: W + 1}).fill([-1, -1]))

// Bottom-Up 연산
for (let i = 0; i < W; i++) {
  const axis0 = i === 0 ? [1, 1] : workArr[i - 1]

  for (let j = 0; j < W; j++) {
    if (i > 0 && i === j) continue

    const axis1 = j === 0 ? [N, N] : workArr[j - 1]

    const maxIdx = Math.max(i, j) + 1

    // axis0 이 이동하는 경우
    if (resultArr[maxIdx][j] > resultArr[i][j] + distance(axis0, workArr[maxIdx - 1])) {
      resultArr[maxIdx][j] = resultArr[i][j] + distance(axis0, workArr[maxIdx - 1])
      prevArr[maxIdx][j] = [i, j]
    }
    // axis1 이 이동하는 경우
    if (resultArr[i][maxIdx] > resultArr[i][j] + distance(axis1, workArr[maxIdx - 1])) {
      resultArr[i][maxIdx] = resultArr[i][j] + distance(axis1, workArr[maxIdx - 1])
      prevArr[i][maxIdx] = [i, j]
    }
  }
}

// 최소값 구하기
let result = 20000000
let nowRow = -1
let nowCol = -1

for (let i = 0; i <= W; i++) {
  if (result > resultArr[W][i]) {
    result = resultArr[W][i]
    nowRow = W
    nowCol = i
  }

  if (result > resultArr[i][W]) {
    result = resultArr[i][W]
    nowRow = i
    nowCol = W
  }
}

// 역추적 배열 생성. 추후 reverse 해야됨
const printArr = []

while (nowRow > -1) {
  const [prevRow, prevCol] = prevArr[nowRow][nowCol]

  if (prevRow === -1) {
    break
  }

  if (prevRow === nowRow) {
    printArr.push(2)
  } // ::
  else {
    printArr.push(1)
  }
  nowRow = prevRow
  nowCol = prevCol
}

printArr.reverse()

process.stdout.write(`${result}\n`)
process.stdout.write(`${printArr.join('\n')}`)

function distance(axis0, axis1) {
  return Math.abs(axis1[0] - axis0[0]) + Math.abs(axis1[1] - axis0[1])
}
