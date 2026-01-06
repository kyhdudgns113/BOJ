// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const axisArr = inputArr.map(inputStr => inputStr.split(' ').map(Number))

// x 좌표, y 좌표만 따로 구하기
const [x0, x1, x2] = axisArr.map(axis => axis[0])
const [y0, y1, y2] = axisArr.map(axis => axis[1])

// 출력할 결과값 변수 선언
let resultX = -1
let resultY = -1

// X 좌표 구하기
if (x0 === x1) resultX = x2
else if (x1 === x2) resultX = x0
else resultX = x1

// Y 좌표 구하기
if (y0 === y1) resultY = y2
else if (y1 === y2) resultY = y0
else resultY = y1

// 결과 출력
process.stdout.write(`${resultX} ${resultY}`)
