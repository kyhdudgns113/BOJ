// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const triangle = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 결과 배열
const resultArr = Array.from({length: 501}, () => Array.from({length: 501}, () => -1))

// 초기값 설정
resultArr[0][0] = triangle[0][0]

// 콜스택 변수
const callStack = Array.from({length: 250002}, () => null)
let stackIdx = -1

// Top-Down 으로 처음에 연산하는 값 스택에 저장
for (let col = 0; col < N; col++) {
  stackIdx += 1
  callStack[stackIdx] = [N - 1, col]
}

// Top-Down 비재귀 방식으로 연산
while (stackIdx >= 0) {
  const [row, col] = callStack[stackIdx]

  // 이미 연산이 된 경우 스택을 pop 만 한다.
  if (resultArr[row][col] !== -1) {
    callStack[stackIdx] = null // 안해도 되지만 의미상 넣어놨다.
    stackIdx -= 1
    continue
  }

  // 바로 위 값이 연산되었나 확인한다.
  // 바로 위가 비었으면 0 이며, 계산하지 않는다.
  const resultUp = row > col ? resultArr[row - 1][col] : 0
  if (resultUp === -1) {
    stackIdx += 1
    callStack[stackIdx] = [row - 1, col]
    continue
  }

  // 대각선 위의 값이 연산되었나 확인한다.
  // 대각선 위로 못 간다면 0 이며, 계산하지 않는다.
  const resultSlash = col > 0 ? resultArr[row - 1][col - 1] : 0
  if (resultSlash === -1) {
    stackIdx += 1
    callStack[stackIdx] = [row - 1, col - 1]
    continue
  }

  // 연산을 한다.
  resultArr[row][col] = Math.max(resultUp, resultSlash) + triangle[row][col]
  callStack[stackIdx] = null
  stackIdx -= 1
}

// 결과값 계산
let result = Math.max(...resultArr[N - 1])

// 출력
process.stdout.write(`${result}`)
