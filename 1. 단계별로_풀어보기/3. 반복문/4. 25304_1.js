const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

const X = parseInt(inputs[0])
const N = parseInt(inputs[1])

let sums = 0

for (let i = 0; i < N; i++) {
  const inputRow = inputs[i + 2].split(' ')
  const [a, b] = [parseInt(inputRow[0]), parseInt(inputRow[1])]

  sums += a * b
}

if (X === sums) {
  process.stdout.write(`Yes`)
} // ::
else {
  process.stdout.write('No')
}
