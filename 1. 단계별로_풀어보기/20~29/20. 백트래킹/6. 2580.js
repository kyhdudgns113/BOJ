// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const board = inputArr.map(row => row.split(' ').map(Number))

// 남은 0의 갯수
const entireZero = board.reduce((prev, row) => (prev += row.filter(num => num === 0).length), 0)

let row = 0
let col = 0
let isFound = false

for (row = 0; row < 9; row++) {
  for (col = 0; col < 9; col++) {
    if (board[row][col] === 0) {
      recurse(row, col, 1)
      break
    }
  }

  if (col < 9) break
}

// 출력 결과 저장할 변수 (변태적으로 쓰는건 기분탓이다)
let resultStr = ''

board.forEach(row => {
  resultStr += row.join(' ') + '\n'
})

// 출력
process.stdout.write(resultStr)

function recurse(nowRow, nowCol, filledZero) {
  const isOK = Array.from({length: 10}).fill(true)

  // 같은 행에서 이미 있는 숫자 거르기
  for (let col = 0; col < 9; col++) {
    isOK[board[nowRow][col]] = false
  }

  // 같은 열에서 이미 있는 숫자 거르기
  for (let row = 0; row < 9; row++) {
    isOK[board[row][nowCol]] = false
  }

  // 같은 9분면에서 이미 있는 숫자 거르기
  const rowStart = 3 * Math.floor(nowRow / 3)
  const colStart = 3 * Math.floor(nowCol / 3)

  for (let row = rowStart; row < rowStart + 3; row++) {
    for (let col = colStart; col < colStart + 3; col++) {
      isOK[board[row][col]] = false
    }
  }

  for (let val = 1; val < 10; val++) {
    if (isOK[val]) {
      board[nowRow][nowCol] = val

      if (filledZero === entireZero) {
        isFound = true
        return
      }

      if (isFound) return

      let foundNext = false
      for (let nextRow = nowRow; nextRow < 9; nextRow++) {
        for (let nextCol = nextRow === nowRow ? nowCol + 1 : 0; nextCol < 9; nextCol++) {
          if (board[nextRow][nextCol] === 0) {
            foundNext = true
            recurse(nextRow, nextCol, filledZero + 1)
            if (isFound) {
              return
            }
            break
          }
        }
        if (foundNext) break
      }

      if (!isFound) {
        board[nowRow][nowCol] = 0
      }
    }
  }
}
