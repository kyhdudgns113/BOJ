// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const S = inputArr[0]

// S 의 배열화
const SArr = S.split('')

// 부분 문자열을 저장할 변수
const dict = {}

// 부분 문자열들 저장
const lenS = S.length

for (let i = 0; i < lenS; i++) {
  for (let j = i; j < lenS; j++) {
    const tempString = S.slice(i, j + 1)
    dict[tempString] = 1
  }
}

// 결과 출력
const result = Object.keys(dict).filter(key => dict[key] === 1).length

process.stdout.write(`${result}`)
