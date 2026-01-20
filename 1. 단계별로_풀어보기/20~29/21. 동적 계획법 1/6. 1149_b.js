// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const rgbArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 결과 저장할 배열
const resultArr = Array.from({length: 1001}, () => Array.from({length: 3}, () => 1000001))

// 초기값 저장
resultArr[0][0] = rgbArr[0][0]
resultArr[0][1] = rgbArr[0][1]
resultArr[0][2] = rgbArr[0][2]

// Bottom-Up 방식으로 연산
for (let i = 0; i < N - 1; i++) {
  resultArr[i + 1][0] = Math.min(resultArr[i][1], resultArr[i][2]) + rgbArr[i + 1][0]
  resultArr[i + 1][1] = Math.min(resultArr[i][0], resultArr[i][2]) + rgbArr[i + 1][1]
  resultArr[i + 1][2] = Math.min(resultArr[i][0], resultArr[i][1]) + rgbArr[i + 1][2]
}

// 결과 구하기
let result = Math.min(...resultArr[N - 1])

// 출력
process.stdout.write(`${result}`)
