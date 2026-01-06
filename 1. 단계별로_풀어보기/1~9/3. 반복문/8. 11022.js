const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

const T = +inputs[0]

for (let i = 0; i < T; i++) {
  const inputRow = inputs[i + 1].split(' ')
  const [A, B] = [+inputRow[0], +inputRow[1]]
  process.stdout.write(`Case #${i + 1}: ${A} + ${B} = ${A + B}\n`)
}
