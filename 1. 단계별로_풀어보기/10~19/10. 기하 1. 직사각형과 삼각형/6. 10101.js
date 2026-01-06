// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const lenArr = inputArr.map(Number)
lenArr.sort()

// 각도 크기들 변수화
const [A, B, C] = lenArr

let result = ''

if (A + B + C !== 180) result = 'Error'
else if (A === B && B === C) result = 'Equilateral'
else if (A === B || B === C) result = 'Isosceles'
else result = 'Scalene'

process.stdout.write(result)
