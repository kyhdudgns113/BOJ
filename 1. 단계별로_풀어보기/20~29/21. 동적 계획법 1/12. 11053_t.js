// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const A = inputArr[1].split(' ').map(Number)

// 결과 배열
const resultArr = Array.from({length: N}, () => null)

// 초기값
resultArr[0] = 1

// 콜스택 선언
const callStack = Array.from({length: 4000}, () => null)
let stackIdx = -1

// 콜스택에 초기 연산할 값 삽입
for (let i = 0; i < N; i++) {
  stackIdx += 1
  callStack[stackIdx] = i
}

// Top-Down 비재귀 연산
while (stackIdx >= 0) {
  const n = callStack[stackIdx]

  // 값이 이미 저장되어 있으면 연산을 하지 않는다.
  if (resultArr[n] !== null) {
    stackIdx -= 1
    continue
  }

  // 본인보다 작은 이전값들 중에서 연산이 안된게 있으면 바로 스택에 올린다.
  let nowVal = 0
  let prevN = 0
  for (prevN = 0; prevN < n; prevN++) {
    const resultPrev = A[prevN] < A[n] ? resultArr[prevN] : 0
    if (resultPrev === null) {
      break
    }
    nowVal = Math.max(nowVal, resultPrev)
  }
  if (prevN < n) {
    stackIdx += 1
    callStack[stackIdx] = prevN
    continue
  }

  // 본인보다 작은 이전값들이 전부 연산이 되었다면 현재값을 갱신한다.
  resultArr[n] = nowVal + 1
  stackIdx -= 1
}

// 최대값 구하기
const result = Math.max(...resultArr)

// 출력
process.stdout.write(`${result}`)