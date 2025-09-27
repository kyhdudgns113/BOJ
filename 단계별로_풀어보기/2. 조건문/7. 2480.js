const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString()

const [a, b, c] = inputs.split(' ')

const [A, B, C] = [parseInt(a), parseInt(b), parseInt(c)].sort()

let score = 0

if (A === B && B === C) {
  score = 10000 + A * 1000
} // ::
else if (A === B || B === C) {
  score = 1000 + B * 100
} // ::
else {
  score = C * 100
}

process.stdout.write(`${score}`)
