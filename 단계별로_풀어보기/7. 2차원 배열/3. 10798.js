// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 5 * 15 의 공백으로 채워진 배열 생성
const M = Array(15)
  .fill(null)
  .map(() => Array.from({length: 5}).fill(''))

// 배열 M 에 입력을 reverse 하여 입력
inputArr.forEach((row, rowIdx) => {
  row
    .trim()
    .split('')
    .forEach((c, colIdx) => {
      M[colIdx][rowIdx] = c
    })
})

M.forEach(row => {
  process.stdout.write(`${row.join('')}`)
})
