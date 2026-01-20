// Top-Down 방식이다.
// 재귀함수로 풀면 스택을 초과하게되어 반복문으로 구현했다.

// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 결과 저장힐 배열
const numArr = Array.from({length: N + 1}, () => null)

// 콜스택
const callStack = Array.from({length: 2000000}, () => null)
let stackIdx = 0
callStack[0] = N

while (stackIdx >= 0) {
  const n = callStack[stackIdx]

  // 종료 조건
  if (n < 2) {
    numArr[n] = 1
    callStack[stackIdx--] = null
    continue
  }

  // 값이 이미 있으면 더 연산하지 않는다.
  if (numArr[n] !== null) {
    callStack[stackIdx] = null
    stackIdx--
    continue
  }

  // dp(n - 1) 을 구한다. 없으면 연산해야 하므로 스택에 넣는다.
  const n1 = numArr[n - 1]
  if (n1 === null) {
    callStack[++stackIdx] = n - 1
    continue
  }

  // dp(n - 2) 을 구한다. 없으면 연산해야 하므로 스택에 넣는다.
  const n2 = numArr[n - 2]
  if (n2 === null) {
    callStack[++stackIdx] = n - 2
    continue
  }

  // dp(n - 1) 과 dp(n - 2) 값이 있으므로 연산하고 대입한다.
  numArr[n] = (n1 + n2) % 15746
  callStack[stackIdx--] = null
}

// 출력
process.stdout.write(`${numArr[N]}`)
