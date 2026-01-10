// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const axisArr = inputArr.slice(1).map(inputStr => inputStr.split(' ').map(Number))

// 정렬
axisArr.sort((axis0, axis1) => {
  if (axis0[1] < axis1[1]) return -1
  else if (axis0[1] === axis1[1] && axis0[0] < axis1[0]) return -1
  else return 1
})

// 출력
axisArr.forEach(axis => process.stdout.write(`${axis[0]} ${axis[1]}\n`))
