// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

const M = inputArr.map(row => row.split(' ').map(Number))

// 최대값 찾기
let max_row = 0
let max_col = 0
let maxValue = -1

M.forEach((row, rowIdx) => {
  row.forEach((val, colIdx) => {
    if (maxValue < val) {
      maxValue = val
      max_row = rowIdx
      max_col = colIdx
    }
  })
})

// 결과값 출력
process.stdout.write(`${maxValue}\n`)
process.stdout.write(`${max_row + 1} ${max_col + 1}`)
