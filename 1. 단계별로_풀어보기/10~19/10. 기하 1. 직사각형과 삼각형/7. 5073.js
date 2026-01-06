// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 연산
inputArr.forEach(inputStr => {
  // 입력 파싱
  const lenArr = inputStr.trim().split(' ').map(Number)
  lenArr.sort((a, b) => a - b)

  // 각 변 길이 작은 순서대로 변수화
  const [A, B, C] = lenArr

  if (A === 0 && B === 0 && C === 0) return

  if (A + B <= C) process.stdout.write('Invalid\n')
  else if (A === B && B === C) process.stdout.write('Equilateral\n')
  else if (A === B || B === C) process.stdout.write('Isosceles\n')
  else process.stdout.write('Scalene\n')
})
