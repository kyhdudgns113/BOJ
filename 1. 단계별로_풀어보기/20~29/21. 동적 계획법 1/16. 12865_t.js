// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, K] = inputArr[0].split(' ').map(Number)
const WVArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 결과 배열
const resultArr = Array.from({length: N}, () => Array.from({length: K + 1}).fill(null))

// 초기값 계싼
resultArr[0][0] = 0
if (WVArr[0][0] <= K) {
  resultArr[0][WVArr[0][0]] = WVArr[0][1]
}

// 콜스택 선언
const callStack = Array.from({length: 111000}).fill(null)
let stackIdx = -1

// 콜스택에 연산할 초기값 입력
for (let i = 0; i <= K; i++) {
  callStack[i] = [N - 1, i]
  stackIdx = i
}

// Top-Down 비재귀 연산
while (stackIdx >= 0) {
  const [n, k] = callStack[stackIdx]
  const [w, v] = WVArr[n]

  // 연산된적 있으면 스킵한다
  if (resultArr[n][k] !== null) {
    stackIdx -= 1
    continue
  }

  const nPrev = n > 0 ? resultArr[n - 1][k] : -1
  if (nPrev === null) {
    stackIdx += 1
    callStack[stackIdx] = [n - 1, k]
    continue
  }

  const nPrevW = (n > 0) && (k - w >= 0) ? resultArr[n - 1][k - w] : -1
  if (nPrevW === null) {
    stackIdx += 1
    callStack[stackIdx] = [n - 1, k - w]
    continue
  }
  resultArr[n][k] = Math.max(nPrev, nPrevW >= 0 ? nPrevW + v : -1)
  stackIdx -= 1
}

// 결과값 계산
const result = Math.max(...resultArr[N - 1].filter(val => val !== null), 0)

// 출력
process.stdout.write(`${result}`)