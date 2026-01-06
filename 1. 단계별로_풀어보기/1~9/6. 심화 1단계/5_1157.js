// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 대문자들의 ASCII 코드 배열로 변환
const encoder = new TextEncoder()
const capitalize = encoder.encode(inputArr[0].toUpperCase())

// 알파벳별 사용횟수 기록할 배열
const cntArr = Array.from({length: 26}).fill(0)

// A 의 아스키코드
const baseVal = 'A'.charCodeAt(0)

// 등장횟수 카운팅
capitalize.forEach(char => {
  const charIdx = char - baseVal
  cntArr[charIdx] += 1
})

// 최대횟수 확인
let result = ''
let maxCnt = 0

cntArr.forEach((cnt, charIdx) => {
  // 등장횟수 중복이면 ? 를 출력
  if (maxCnt === cnt) {
    result = '?'
  }

  // 등장횟수 갱신되면 갱신
  if (maxCnt < cnt) {
    result = String.fromCharCode(charIdx + baseVal)
    maxCnt = cnt
  }
})

// 출력
process.stdout.write(`${result}`)
