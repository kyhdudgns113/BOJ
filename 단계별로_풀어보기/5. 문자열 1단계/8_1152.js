// 입력
const fs = require('fs')
const input = fs.readFileSync(0, 'utf8').toString().trim().split(' ')

// 단어 개수 계산
// 공백을 제거한 단어의 개수를 계산
const result = input.filter(word => word.trim().length > 0).length

// 결과 출력
process.stdout.write(`${result}`)
