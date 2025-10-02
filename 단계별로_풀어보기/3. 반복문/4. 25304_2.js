const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

const X = parseInt(inputs[0])
const N = parseInt(inputs[1])

const result = Array(N)
  .fill(0)
  .map((_, idx) => inputs[idx + 2].split(' ').map(val => parseInt(val)))
  .reduce((res, [a, b]) => res + a * b, 0)

process.stdout.write(`${X === result ? 'Yes' : 'No'}`)
