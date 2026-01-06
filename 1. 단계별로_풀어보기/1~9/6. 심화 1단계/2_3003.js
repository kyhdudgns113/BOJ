// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 입력 파싱
const numArr = inputArr[0].trim().split(' ').map(Number)

// 비교군 배열
const targetArr = [1, 1, 2, 2, 2, 8]

// 출력할 string 에 값 추가
let result = ''

targetArr.forEach((target, idx) => {
  const temp = target - numArr[idx]
  result += temp + ' '
})

process.stdout.write(result)
