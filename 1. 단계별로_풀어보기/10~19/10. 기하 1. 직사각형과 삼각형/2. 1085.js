// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [X, Y, W, H] = inputArr[0].split(' ').map(Number)

// 가로거리, 세로거리의 최소값
const minHorizon = Math.min(X, W - X)
const minVertical = Math.min(Y, H - Y)
const result = Math.min(minHorizon, minVertical)

// 결과 출력
process.stdout.write(`${result}`)
