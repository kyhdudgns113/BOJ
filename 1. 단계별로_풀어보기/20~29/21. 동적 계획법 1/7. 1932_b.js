// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const triangle = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 결과 배열
const resultArr = Array.from({length: 501}, () => Array.from({length: 501}, () => 0))

// 초기값 설정
resultArr[0][0] = triangle[0][0]

// Bottom-Up 연산
for (let row = 0; row < N - 1; row++) {
  for (let col = 0; col <= row; col++) {
    resultArr[row + 1][col] = Math.max(resultArr[row + 1][col], resultArr[row][col] + triangle[row + 1][col])
    resultArr[row + 1][col + 1] = Math.max(resultArr[row + 1][col + 1], resultArr[row][col] + triangle[row + 1][col + 1])
  }
}

// 결과 구하기
let result = Math.max(...resultArr[N - 1])

// 출력
process.stdout.write(`${result}`)
