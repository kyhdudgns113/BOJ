// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const numArr = inputArr[1].split(' ').map(Number)

// 추가 대기열 확보
const extraStack = Array.from({length: 1000}).fill(0)
let extraIdx = 0
let numIdx = 0

// 결과 출력 변수
let result = 'Nice'

// 1번부터 연산
for (let i = 1; i <= N; i++) {
  let isFind = false

  // 추가 대기열 맨 앞에 있는지 먼저 확인
  if (extraIdx > 0 && extraStack[extraIdx - 1] === i) {
    isFind = true
    extraIdx -= 1
    continue
  }

  // 원래 대기열에서 찾을 수 있나 확인
  for (numIdx = numIdx; numIdx < N; numIdx++) {
    if (numArr[numIdx] === i) {
      // 찾았으면 목록에서 제거한다.
      isFind = true
      numIdx += 1
      break
    } //
    else {
      // 못 찾았으면 추가 대기열로 넘긴다.
      extraStack[extraIdx] = numArr[numIdx]
      extraIdx += 1
    }
  }

  if (!isFind) {
    result = 'Sad'
    break
  }
}

process.stdout.write(result)
