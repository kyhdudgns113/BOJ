const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split(' ')

let [A, B, C] = inputs

A = parseInt(A)
B = parseInt(B)
C = parseInt(C)

// prettier-ignore
const resultsArr = [
  (A + B) % C,
  ((A % C) + (B % C)) % C,
  (A * B) % C,
  ((A % C) * (B % C)) % C
]

process.stdout.write(resultsArr.join('\n'))
