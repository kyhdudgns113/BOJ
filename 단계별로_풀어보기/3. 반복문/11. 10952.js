const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

let i = 0

while (true) {
  const inputRow = inputs[i].split(' ')
  i += 1

  const [A, B] = [+inputRow[0], +inputRow[1]]

  if (A === 0 && B === 0) break

  process.stdout.write(`${A + B}\n`)
}
