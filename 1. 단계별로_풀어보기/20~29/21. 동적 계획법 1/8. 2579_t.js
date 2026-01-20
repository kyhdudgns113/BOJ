// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const stairs = inputArr.slice(1).map(Number)

// 결과 저장할 배열
// resultArr[step][stair] : stair 번째 계단을 밟았고, step 만큼 연달아 계단을 밟은 상태일때, 점수의 최대값
const resultArr = Array.from({length: 2}, () => Array.from({length: 303}, () => -1))

// 콜스택
const callStack = Array.from({length: 2 * 2 * 301}, () => null)
let stackIdx = -1

// 구하고자 하는 값들을 콜스택에 넣는다.
callStack[0] = [0, N - 1]
callStack[1] = [1, N - 1]
stackIdx = 1

// Top-Down 비재귀 방식 연산
while (stackIdx >= 0) {
  const [step, stairIdx] = callStack[stackIdx]

  // 이미 연산되었다면 스킵한다.
  if (resultArr[step][stairIdx] > -1) {
    callStack[stackIdx] = null // 안해도 되는 연산이지만 알고리즘 이해를 돕기위해 굳이 작성
    stackIdx -= 1
    continue
  }

  // step 에 따라서 다르게 연산한다.
  if (step === 0) {
    // 현재 계단을 밟기위해 전전 계단에서 점프를 한 상태이다.

    // 전전계단이 점프해서 밟힌 경우의 값
    // - 전전계단이 없으면 0이다.
    const step0 = stairIdx >= 2 ? resultArr[0][stairIdx - 2] : 0

    // 연산이 된 적 없다면 콜스택에 넣어 연산을 하도록 한다.
    if (step0 === -1) {
      stackIdx++
      callStack[stackIdx] = [0, stairIdx - 2]
      continue
    }

    // 전전계단이 연달아서 밟힌 경우의 값
    // - 전전계단이 없으면 0이다.
    const step1 = stairIdx >= 2 ? resultArr[1][stairIdx - 2] : 0

    // 연산이 된 적 없다면 콜스택에 넣어 연산을 하도록 한다.
    if (step1 === -1) {
      stackIdx++
      callStack[stackIdx] = [1, stairIdx - 2]
      continue
    }

    // 둘 다 연산이 된 적 있으면 값을 그대로 구한다.
    resultArr[step][stairIdx] = Math.max(step0, step1) + stairs[stairIdx]
    callStack[stackIdx] = null // 안해도 됨
    stackIdx--
  } // ::
  else {
    // 현재 계단을 밟기위해 직전 계단에서 한 걸음 걸은 상태이다.

    // 이전 계단을 점프해서 밟은 값을 구한다.
    // - 이전 계단이 없으면 0이다.
    const prev = stairIdx >= 1 ? resultArr[0][stairIdx - 1] : 0
    if (prev === -1) {
      stackIdx++
      callStack[stackIdx] = [0, stairIdx - 1]
      continue
    }

    // 필요한 값이 연산이 되어있다면 현재 값을 갱신한다.
    resultArr[step][stairIdx] = prev + stairs[stairIdx]
    callStack[stackIdx] = null // 안해도 됨
    stackIdx--
  }
}

// 결과값 계산
const result = Math.max(resultArr[0][N - 1], resultArr[1][N - 1])

// 출력
process.stdout.write(`${result}`)
