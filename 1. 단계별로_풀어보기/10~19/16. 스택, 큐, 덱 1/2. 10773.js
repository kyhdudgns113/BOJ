// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const K = +inputArr[0]
const queryArr = inputArr.slice(1).map(Number)

// 스택 역할읋 할 배열 선언
const stackArr = Array.from({length: 100005}).fill(0)
let stackIdx = 0

// 쿼리 실행
queryArr.forEach(query => {
  if (query === 0) {
    stackIdx -= 1
    stackArr[stackIdx] = 0
  } //
  else {
    stackArr[stackIdx] = query
    stackIdx += 1
  }
})

// 결과 계산
const result = stackArr.reduce((acc, val) => (acc += val), 0)
process.stdout.write(`${result}`)
