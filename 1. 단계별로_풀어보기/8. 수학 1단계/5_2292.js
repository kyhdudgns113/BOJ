// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 2차 부등식 풀이로 나온 결과 대입
const result = -Math.floor(-0.5 - Math.sqrt((4 * N - 1) / 12))

// 출력
process.stdout.write(`${result}`)
