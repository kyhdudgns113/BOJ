// 입력
const fs = require('fs')
const input = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')[0]

// 알파벳별 값 매핑
// prettier-ignore
const numMap = {
  'A': 3, 'B': 3, 'C': 3,
  'D': 4, 'E': 4, 'F': 4,
  'G': 5, 'H': 5, 'I': 5,
  'J': 6, 'K': 6, 'L': 6,
  'M': 7, 'N': 7, 'O': 7,
  'P': 8, 'Q': 8, 'R': 8, 'S': 8,
  'T': 9, 'U': 9, 'V': 9,
  'W': 10, 'X': 10, 'Y': 10, 'Z': 10
}

// 문자열을 char 배열로 변환
const wordArr = input.split('')

// 결과갑 생성 및 출력
const result = wordArr.reduce((acc, word) => (acc += numMap[word]), 0)

process.stdout.write(`${result}`)
