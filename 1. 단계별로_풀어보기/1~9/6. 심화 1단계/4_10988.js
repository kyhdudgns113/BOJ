// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 입력 파싱
const charArr = inputArr[0].split('')
const len = charArr.length

// 팰린드롬 확인
for (let i = 0; i <= len / 2; i++) {
  const idxFront = i
  const idxEnd = len - i - 1

  if (charArr[idxFront] !== charArr[idxEnd]) {
    process.stdout.write('0')
    return
  }
}

process.stdout.write('1')
