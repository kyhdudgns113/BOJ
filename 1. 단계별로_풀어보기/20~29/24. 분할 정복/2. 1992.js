// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const matrix = inputArr.slice(1).map(row => row.trim().split(''))

function getString(rowStart, colStart, rowOver, colOver) {
  if (rowOver - rowStart === 1) {
    // 문자열로 리턴하지 않으면 숫자를 더하게 된다.
    return `${matrix[rowStart][colStart]}`
  }

  const rowHalf = Math.floor((rowOver + rowStart) / 2)
  const colHalf = Math.floor((colOver + colStart) / 2)

  const part00 = getString(rowStart, colStart, rowHalf, colHalf)
  const part01 = getString(rowStart, colHalf, rowHalf, colOver)
  const part10 = getString(rowHalf, colStart, rowOver, colHalf)
  const part11 = getString(rowHalf, colHalf, rowOver, colOver)

  if (part00.length === 1 && part00 === part01 && part01 === part10 && part10 === part11) {
    return part00
  }

  return `(${part00}${part01}${part10}${part11})`
}

process.stdout.write(getString(0, 0, N, N))
