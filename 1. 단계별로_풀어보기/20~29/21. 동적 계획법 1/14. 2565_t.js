// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const mapArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// mapArr 정렬
mapArr.sort((a, b) => a[0] - b[0])

// 결과 배열
const resultArr = Array.from({length: N}).fill(null)

// 초기값 저장
resultArr[0] = 1

// 콜스택 선언
const callStack = Array.from({length: 400}).fill(null)
let stackIdx = -1

// 연산할 값 콜스택에 저장
for (let now = 1; now < N; now++) {
  stackIdx++
  callStack[stackIdx] = now
}

// Top-Down 비재귀 연산
while (stackIdx >= 0) {
  const n = callStack[stackIdx]

  // 이미 연산된 적 있으면 스킵한다
  if (resultArr[n] !== null) {
    stackIdx -= 1
    continue
  }

  // 본인보다 작은 이전값들 중에서 연산이 안된게 있으면 바로 스택에 올린다.
  let maxVal = 0
  let prevN = 0
  for (prevN = 0; prevN < n; prevN++) {
    const temp = mapArr[prevN][1] < mapArr[n][1] ? resultArr[prevN] : 0
    if (temp === null) {
      break
    }
    maxVal = Math.max(maxVal, temp)
  }
  if (prevN < n) {
    stackIdx++
    callStack[stackIdx] = prevN
    continue
  }

  // 연산이 안된것이 없다면 현재값을 연산한다.
  resultArr[n] = maxVal + 1
  stackIdx--
}

// 결과 계산
const result = N - Math.max(...resultArr)

// 츨략
process.stdout.write(`${result}`)
