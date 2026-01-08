// 입력
const inputArr = require('fs').readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].split(' ').map(Number)
const board = inputArr.slice(1).map(inputStr => inputStr.trim().split(''))

// 결과값 담을 변수
let result = 64

// 브루트 포스 연산
for (let rowIdx = 0; rowIdx < N - 7; rowIdx++) {
  for (let colIdx = 0; colIdx < M - 7; colIdx++) {
    let tempResult = 0

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const base = (i + j) % 2 === 0 ? 'W' : 'B'

        if (board[rowIdx + i][colIdx + j] !== base) {
          tempResult += 1
        }
      }
    }

    tempResult = Math.min(tempResult, 64 - tempResult)

    result = Math.min(result, tempResult)
  }
}

process.stdout.write(`${result}`)
