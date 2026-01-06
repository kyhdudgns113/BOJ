// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].split(' ').map(Number)

const A = inputArr.slice(1, N + 1).map(row => row.split(' ').map(Number))
const B = inputArr.slice(N + 1).map(row => row.split(' ').map(Number))

// 배열 열산
const resultArr = A.map((row, rowIdx) => {
  return row.map((val, colIdx) => val + B[rowIdx][colIdx])
})

// 출력
let result = ''
resultArr.forEach((row, rowIdx) => {
  let ret = row.join(' ')

  if (rowIdx < N - 1) {
    ret += '\n'
  }

  result += ret
})

process.stdout.write(result)
