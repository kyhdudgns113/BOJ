// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const A = inputArr[1].split(' ').map(Number)

// 결과 배열
const incArr = Array.from({length: N}).fill(null)
const decArr = Array.from({length: N}).fill(null)

// 초기값 설정
incArr[0] = 1
decArr[N - 1] = 1

// 콜 스택
const callStack = Array.from({length: N}).fill(null)
let stackIdx = -1

// 콜 스택에 연산할 값들 삽입
for (let num = 0; num < N; num++) {
  stackIdx += 1
  callStack[stackIdx] = ['inc', num]
  stackIdx += 1
  callStack[stackIdx] = ['dec', num]
}

// Top-Down 비재귀 연산
while (stackIdx >= 0) {
  const [arrType, n] = callStack[stackIdx]

  // 증가하는 수열일때 연산
  if (arrType === 'inc') {
    // 연산된적 있으면 스킵한다.
    if (incArr[n] !== null) {
      stackIdx -= 1
      continue
    }

    // 이전 증가수열 길이중 연산 안된것 있으면 콜스택에 넣는다.
    let maxInc = 0
    let prevN = 0
    for (prevN = 0; prevN < n; prevN++) {
      const prevInc = A[prevN] < A[n] ? incArr[prevN] : 0
      if (prevInc === null) {
        break
      }
      maxInc = Math.max(maxInc, prevInc)
    }
    if (prevN < n) {
      stackIdx += 1
      callStack[stackIdx] = ['inc', prevN]
      continue
    }

    incArr[n] = maxInc + 1
    stackIdx -= 1
  } // ::
  else {
    if (decArr[n] !== null) {
      stackIdx -= 1
      continue
    }

    // 이전 감소수열 길이중 연산 안된것 있으면 콜스택에 넣는다.
    let maxDec = 0
    let nextN = 0
    for (nextN = n + 1; nextN < N; nextN++) {
      const prevDec = A[nextN] < A[n] ? decArr[nextN] : 0
      if (prevDec === null) {
        break
      }
      maxDec = Math.max(maxDec, prevDec)
    }
    if (nextN < N) {
      stackIdx += 1
      callStack[stackIdx] = ['dec', nextN]
    }

    decArr[n] = maxDec + 1
    stackIdx -= 1
  }
}

// 바이토닉 배열 구하기
const bitonicArr = Array.from({length: N}).map((_, idx) => incArr[idx] + decArr[idx] - 1)

// 결과 구하기
const result = Math.max(...bitonicArr)

// 출력
process.stdout.write(`${result}`)