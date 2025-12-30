// 입력
const fs = require('fs')
const inputArr = fs.readFileSync('/dev/stdin').toString().split('\n')

// 입력 parsing
const N = +inputArr[0] // unused
const numString = inputArr[1]

// 입력받은 문자열을 바이트 배열로 변환
const encoder = new TextEncoder()
const byteArr = encoder.encode(numString)
const baseVal = encoder.encode('0')

// 결과값 계산
const result = byteArr.reduce((acc, val) => (acc += val - baseVal), 0)

// 결과값 출력
process.stdout.write(`${result}`)
