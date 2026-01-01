// 입력
const fs = require('fs')
const input = fs.readFileSync(0, 'utf8').toString().trim().split('\n')[0]

const [A, B] = input.split(' ')

// 문자열을 뒤집는다
const AReverse = A.split('').reverse().join('')
const BReverse = B.split('').reverse().join('')

// 숫자로 변환
const ARNum = +AReverse
const BRNum = +BReverse

// 둘 중 더 큰것을 출력
process.stdout.write(`${ARNum > BRNum ? ARNum : BRNum}`)
