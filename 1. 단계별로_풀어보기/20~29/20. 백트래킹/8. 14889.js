// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const board = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 스타트 팀인지 저장
const isStart = Array.from({length: N}).fill(false)

// 결과값 저장할 변수
let result = 1000000000

// 연산
for (let i = 0; i < N; i++) {
  isStart[i] = true
  recurse(i, 1)
  isStart[i] = false
}

// 출력
process.stdout.write(`${result}`)

function recurse(humanIdx, numStart) {
  // 남은 스타트 팀 배정 가능 인원수
  const remainStart = Math.floor(N / 2) - numStart

  // 종료 조건
  if (remainStart === 0) {
    calculate()
    return
  }

  // 스타트 팀에 들어갈 다음 사람 찾기
  for (let nHumanIdx = humanIdx + 1; nHumanIdx + remainStart <= N; nHumanIdx++) {
    isStart[nHumanIdx] = true
    recurse(nHumanIdx, numStart + 1)
    isStart[nHumanIdx] = false
  }
}

function calculate() {
  let statStart = 0
  let statLink = 0

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (isStart[i] === isStart[j]) {
        if (isStart[i]) {
          statStart += board[i][j] + board[j][i]
        } // ::
        else {
          statLink += board[i][j] + board[j][i]
        }
      }
    }
  }

  result = Math.min(result, Math.abs(statStart - statLink))
}
