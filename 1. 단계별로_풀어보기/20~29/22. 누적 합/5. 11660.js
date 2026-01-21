// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].trim().split(' ').map(Number)
const matrix = inputArr.slice(1, N + 1).map(row => row.trim().split(' ').map(Number))
const queryArr = inputArr.slice(N + 1).map(row => row.trim().split(' ').map(Number))

// 누적합 배열 생성
const sumArr = Array.from({length: N + 1}, () => Array.from({length: N + 1}).fill(0))

// 누적합 배열 연산
for (let row = 1; row <= N; row++) {
  for (let col = 1; col <= N; col++) {
    sumArr[row][col] = sumArr[row - 1][col] + sumArr[row][col - 1] - sumArr[row - 1][col - 1] + matrix[row - 1][col - 1]
  }
}

// 출력 변수
let resultStr = ''

// 쿼리마다 연산
queryArr.forEach(query => {
  const [row1, col1, row2, col2] = query

  result = sumArr[row2][col2] - sumArr[row1 - 1][col2] - sumArr[row2][col1 - 1] + sumArr[row1 - 1][col1 - 1]
  resultStr += result + '\n'
})

process.stdout.write(resultStr)
