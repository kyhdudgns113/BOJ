// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 결과 저장할 배열
const resultArr = Array.from({length: N + 1}, () => Array.from({length: 10}, () => null))

// 초기값 설정
resultArr[1][0] = 0
for (let i = 1; i < 10; i++) {
  resultArr[1][i] = 1
}

// 콜스택 선언
const callStack = Array.from({length: 2000}, () => null)
stackIdx = -1

// 콜스택에 초기 연산할 값 삽입
for (let i = 0; i < 10; i++) {
  callStack[i] = [N, i]
}
stackIdx = 9

// Top-Down 비재귀 방식 연산
while (stackIdx >= 0) {
  const [nowLen, nowNum] = callStack[stackIdx]

  // 값이 이미 연산되었으면 스킵한다
  if (resultArr[nowLen][nowNum] !== null) {
    stackIdx -= 1
    continue
  }

  // 길이가 now - 1 이고, nowNum - 1 로 끝나는 수열의 갯수를 구한다
  const nMinus = nowNum > 0 ? resultArr[nowLen - 1][nowNum - 1] : 0
  if (nMinus === null) {
    stackIdx += 1
    callStack[stackIdx] = [nowLen - 1, nowNum - 1]
    continue
  }

  // 길이가 now - 1 이고, nowNum + 1 로 끝나는 수열의 갯수를 구한다
  const nPlus = nowNum < 9 ? resultArr[nowLen - 1][nowNum + 1] : 0
  if (nPlus === null) {
    stackIdx += 1
    callStack[stackIdx] = [nowLen - 1, nowNum + 1]
    continue
  }

  // 둘 다 구해졌으면 현재값을 연산한다.
  resultArr[nowLen][nowNum] = (nMinus + nPlus) % 1000000000
  stackIdx -= 1
}

// 결과 계산
const result = resultArr[N].reduce((prev, val) => prev = (prev + val) % 1000000000, 0)

// 출력
process.stdout.write(`${result}`)