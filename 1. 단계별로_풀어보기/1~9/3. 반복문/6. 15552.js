const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

const T = parseInt(inputs[0])
const resultArr = []

for (let i = 0; i < T; i++) {
  const [a, b] = inputs[i + 1].split(' ').map(Number)
  // const [a, b] = inputs[i + 1].split(' ').map(val => +val)
  resultArr.push(a + b)
}

process.stdout.write(resultArr.join('\n'))
