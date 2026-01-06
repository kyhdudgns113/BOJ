const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

const T = parseInt(inputs[0])

for (let i = 0; i < T; i++) {
  const inputRow = inputs[i + 1].split(' ')
  const [A, B] = [parseInt(inputRow[0]), parseInt(inputRow[1])]

  process.stdout.write(`${A + B}\n`)
}
