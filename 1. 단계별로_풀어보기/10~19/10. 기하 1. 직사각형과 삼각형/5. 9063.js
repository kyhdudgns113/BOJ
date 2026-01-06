// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const axisArr = inputArr.slice(1).map(inputStr => inputStr.split(' ').map(Number))

// 최소, 최대 좌표 구하기
const minX = Math.min(...axisArr.map(axis => axis[0]))
const maxX = Math.max(...axisArr.map(axis => axis[0]))

const minY = Math.min(...axisArr.map(axis => axis[1]))
const maxY = Math.max(...axisArr.map(axis => axis[1]))

// 결과값
const result = (maxX - minX) * (maxY - minY)

// 출력
process.stdout.write(`${result}`)
