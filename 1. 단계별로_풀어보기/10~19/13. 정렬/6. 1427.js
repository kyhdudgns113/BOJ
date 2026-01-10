// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = inputArr[0].trim().split('')

// 정렬
N.sort((a, b) => b.localeCompare(a))

// 출력
process.stdout.write(`${N.join('')}`)
