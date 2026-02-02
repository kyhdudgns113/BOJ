// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const board = inputArr.slice(1).map(row => row.trim().split('').map(Number))

// 방문 여부 저장
const isVisit = Array.from({length: N}, () => Array.from({length: N}).fill(false))

// 단지에 속한 집의 수를 저장하는 배열
const resultArr = []

// 모든 점마다 dfs 를 수행할 수 있는지 확인
for (let row = 0; row < N; row++) {
  for (let col = 0; col < N; col++) {
    if (board[row][col] === 1 && isVisit[row][col] === false) {
      const result = dfs(row, col)
      resultArr.push(result)
    }
  }
}

resultArr.sort((a, b) => a - b)

let resultStr = `${resultArr.length}\n`
resultArr.forEach(result => (resultStr += result + '\n'))

process.stdout.write(resultStr)

function dfs(row, col) {
  isVisit[row][col] = true
  let result = 1

  if (row > 0 && board[row - 1][col] === 1 && isVisit[row - 1][col] === false) {
    result += dfs(row - 1, col)
  }
  if (row < N - 1 && board[row + 1][col] === 1 && isVisit[row + 1][col] === false) {
    result += dfs(row + 1, col)
  }
  if (col > 0 && board[row][col - 1] === 1 && isVisit[row][col - 1] === false) {
    result += dfs(row, col - 1)
  }
  if (col < N - 1 && board[row][col + 1] === 1 && isVisit[row][col + 1] === false) {
    result += dfs(row, col + 1)
  }

  return result
}
