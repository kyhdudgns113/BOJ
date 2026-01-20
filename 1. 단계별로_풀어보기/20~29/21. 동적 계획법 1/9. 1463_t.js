// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 결과 배열
const resultArr = Array.from({length: N + 1}).map((_, idx) => -1)

// 초기값 연산
resultArr[1] = 0

// 콜스택 선언
const callStack = Array.from({length: 2000002}, () => null)
stackIdx = -1

// 콜스택에 최종 연산할 값을 넣는다.
callStack[0] = N
stackIdx = 0

// Top-Down 비재귀 연산
while (stackIdx >= 0) {
  const n = callStack[stackIdx]

  // 이미 연산되었으면 스킵한다.
  if (resultArr[n] !== -1) {
    stackIdx -= 1
    continue
  }

  // 최종적으로 대입할 값을 저장하는 변수
  let val = n

  if (n % 3 === 0) {
    const idx = Math.floor(n / 3)
    const n3 = idx > 0 ? resultArr[idx] : n
    if (n3 === -1) {
      stackIdx += 1
      callStack[stackIdx] = idx
      continue
    }
    val = Math.min(val, n3 + 1)
  }

  if (n % 2 === 0) {
    const idx = Math.floor(n / 2)
    const n2 = idx > 0 ? resultArr[idx] : n
    if (n2 === -1) {
      stackIdx += 1
      callStack[stackIdx] = idx
      continue
    }
    val = Math.min(val, n2 + 1)
  }

  const n1 = n > 1 ? resultArr[n - 1] : n
  if (n1 === -1) {
    stackIdx += 1
    callStack[stackIdx] = n - 1
    continue
  }
  val = Math.min(val, n1 + 1)

  resultArr[n] = val
  stackIdx -= 1
}

// 출력
process.stdout.write(`${resultArr[N]}`)
