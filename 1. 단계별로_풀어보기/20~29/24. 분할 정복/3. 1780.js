// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const paper = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 종이 배열
const numPaper = [0, 0, 0, 0]

function getPaper(rowStart, colStart, rowOver, colOver) {
  if (rowOver - rowStart === 1) {
    return paper[rowStart][colStart] + 1
  }

  const div = Math.floor((rowOver - rowStart) / 3)

  const paperArr = Array.from({length: 9}).fill(0)
  let isSame = true

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const newRow = rowStart + i * div
      const newCol = colStart + j * div
      paperArr[3 * i + j] = getPaper(newRow, newCol, newRow + div, newCol + div)
    }
  }

  for (let i = 1; i < 9; i++) {
    if (paperArr[i] === 3 || paperArr[i] !== paperArr[i - 1]) {
      isSame = false
      break
    }
  }

  if (!isSame) {
    paperArr.forEach(paper => numPaper[paper]++)
    return 3
  }

  return paperArr[0]
}

numPaper[getPaper(0, 0, N, N)]++

process.stdout.write(`${numPaper[0]}\n${numPaper[1]}\n${numPaper[2]}`)
