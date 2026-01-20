// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const rgbArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 결과 저장할 배열
const resultArr = Array.from({length: 1001}, () => Array.from({length: 3}, () => null))

// 초기값 저장
resultArr[0][0] = rgbArr[0][0]
resultArr[0][1] = rgbArr[0][1]
resultArr[0][2] = rgbArr[0][2]

// 콜스택 배열
const callStack = Array.from({length: 6006}, () => null)
let stackIdx = 0

// 콜스택에 연산할 값을 넣는다.
callStack[0] = [N - 1, 0]
callStack[1] = [N - 1, 1]
callStack[2] = [N - 1, 2]
stackIdx = 2

while (stackIdx >= 0) {
  const [n, rgb] = callStack[stackIdx]

  // 값이 존재하면 넘긴다.
  if (resultArr[n][rgb] !== null) {
    callStack[stackIdx] = null // 필요는 없지만 의미를 표현하기 위함.
    stackIdx--
    continue
  }

  const other1 = resultArr[n - 1][(rgb + 1) % 3]
  if (other1 === null) {
    stackIdx++
    callStack[stackIdx] = [n - 1, (rgb + 1) % 3]
    continue
  }

  const other2 = resultArr[n - 1][(rgb + 2) % 3]
  if (other2 === null) {
    stackIdx++
    callStack[stackIdx] = [n - 1, (rgb + 2) % 3]
    continue
  }

  resultArr[n][rgb] = Math.min(other1, other2) + rgbArr[n][rgb]
  callStack[stackIdx] = null // 필요는 없지만 의미를 표현하기 위함.
  stackIdx--
}

// 결과 구하기
let result = Math.min(...resultArr[N - 1])

// 출력
process.stdout.write(`${result}`)
