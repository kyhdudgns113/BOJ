// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

let result = ''

// 연산 1: 마름모 윗부분 추가
for (let i = 0; i < N; i++) {
  // 공백 추가
  result += ' '.repeat(N - i - 1)

  // 별 추가
  result += '*'.repeat(2 * i + 1)

  // 개행 추가
  result += '\n'
}

// 연산 2: 마름모 아랫부분 추가
for (let i = 0; i < N - 1; i++) {
  // 공백 추가
  result += ' '.repeat(i + 1)

  // 별 추가
  result += '*'.repeat(2 * N - 2 * i - 3)

  // 개행 추가
  if (i !== N - 2) {
    result += '\n'
  }
}

process.stdout.write(result)
