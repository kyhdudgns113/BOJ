const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split(' ')
let [A, B, C] = inputs

A = parseInt(A)
B = parseInt(B)
C = parseInt(C)

const result = A + B + C

process.stdout.write(result.toString())
