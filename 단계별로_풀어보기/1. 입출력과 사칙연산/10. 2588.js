const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

let [num1, num2] = inputs

num1 = parseInt(num1)
num2 = parseInt(num2)

const num2_1 = num2 % 10
const num2_10 = Math.floor(num2 / 10) % 10
const num2_100 = Math.floor(num2 / 100)

// prettier-ignore
const resultArr = [
  num1 * num2_1,
  num1 * num2_10,
  num1 * num2_100,
  num1 * num2
]

process.stdout.write(resultArr.join('\n'))
