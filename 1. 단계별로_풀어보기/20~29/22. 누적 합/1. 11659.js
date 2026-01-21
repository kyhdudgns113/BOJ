// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력
const [N, M] = inputArr[0].trim().split(' ').map(Number)
const numArr = inputArr[1].trim().split(' ').map(Number)
const queryArr = inputArr.slice(2).map(row => row.trim().split(' ').map(Number))

// 누적합 배열 생성
const sumArr = Array.from({length: N + 1}).fill(0)

numArr.forEach((num, idx) => {
  sumArr[idx + 1] = sumArr[idx] + num
})

// 출력 변수
let resultStr = ''

// 쿼리마다 연산
queryArr.forEach(query => {
  const [i, j] = query
  resultStr += sumArr[j] - sumArr[i - 1] + '\n'
})

// 출력
process.stdout.write(`${resultStr}`)
