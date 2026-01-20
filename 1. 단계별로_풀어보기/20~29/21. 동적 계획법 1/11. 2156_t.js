// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const wineArr = inputArr.slice(1).map(Number)

// 결과 저장할 배열
// resultArr[now][skip]: now 번째 와인을 먹기 직전에 스킵을 했는지 여부에 따른 섭취량의 최대값
//   - 3잔 이상을 스킵하는건 고려할 필요 없다.
//     - 그 중간에 잔을 마셔야만 최대치로 섭취할 수 있다.
//   - 1잔을 스킵한거랑 2잔을 스킵한거랑 구분할 필요가 없다.
//     - 몇잔을 스킵했던간에 이번잔과 다음잔을 같이 마실 수 있다는 사실은 변하지 않는다.
const resultArr = Array.from({length: N + 1}, () => Array.from({length: 2}, () => null))

// 초기값
resultArr[0][0] = 0
resultArr[0][1] = wineArr[0]

if (N > 1) {
  resultArr[1][0] = wineArr[0] + wineArr[1]
  resultArr[1][1] = wineArr[1]
}

// 콜스택
const callStack = Array.from({length: 40000}, () => null)
let stackIdx = -1

// 콜스택에 원하는 연산 삽입
callStack[0] = [N - 1, 0]
callStack[1] = [N - 1, 1]
stackIdx = 1

if (N > 1) {
  callStack[2] = [N - 2, 0]
  stackIdx = 2
}

// Top-Down 비재귀 연산
while (stackIdx >= 0) {
  const [nowWine, isSkip] = callStack[stackIdx]

  // 연산된 적 있으면 스킵
  if (resultArr[nowWine][isSkip] !== null) {
    stackIdx -= 1
    continue
  }

  // isSkip 의 경우에 따라서 연산한다.
  if (isSkip === 0) {
    const n1 = resultArr[nowWine - 1][1]
    if (n1 === null) {
      stackIdx += 1
      callStack[stackIdx] = [nowWine - 1, 1]
      continue
    }

    resultArr[nowWine][isSkip] = n1 + wineArr[nowWine]
    stackIdx -= 1
  } // ::
  else {

    const n20 = nowWine > 1 ? resultArr[nowWine - 2][0] : 0
    if (n20 === null) {
      stackIdx += 1
      callStack[stackIdx] = [nowWine - 2, 0]
      continue
    }

    const n21 = nowWine > 1 ? resultArr[nowWine - 2][1] : 0
    if (n21 === null) {
      stackIdx += 1
      callStack[stackIdx] = [nowWine - 2, 1]
      continue
    }

    const n30 = nowWine > 2 ? resultArr[nowWine - 3][0] : 0
    if (n30 === null) {
      stackIdx += 1
      callStack[stackIdx] = [nowWine - 3, 0]
      continue
    }

    const n31 = nowWine > 2 ? resultArr[nowWine - 3][1] : 0
    if (n31 === null) {
      stackIdx += 1
      callStack[stackIdx] = [nowWine - 3, 1]
      continue
    }

    resultArr[nowWine][isSkip] = Math.max(n20, n21, n30, n31) + wineArr[nowWine]
    stackIdx -= 1
  }
}

// 결과 구하기
// * N - 1 번째 와인을 마신 2가지 경우
// * N - 2 번째 와인을 이전것과 같이 마신 경우
// 위 3가지 경우중 최대값만 구하면 된다.
const result = Math.max(resultArr[N - 1][0], resultArr[N - 1][1], N >= 2 ? resultArr[N - 2][0] : 0)

// 출력
process.stdout.write(`${result}`)