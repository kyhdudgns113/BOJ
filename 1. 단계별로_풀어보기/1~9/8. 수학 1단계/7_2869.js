// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().split('\n')

// 입력 파싱
const [A, B, V] = inputArr[0].trim().split(' ').map(Number)

// 마지막에 올라갈 수 있는 거리는 일단 제거한다.
const va = V - A

// 제거한 거리를 등반하는데 필요한 날짜를 구한다.
const dayAlpha = Math.ceil(va / (A - B))

// 마지막 날짜만큼 더한값이 결과이다.
const result = dayAlpha + 1

// 출력
process.stdout.write(`${result}`)
