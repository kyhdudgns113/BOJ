const fs = require('fs')
const input = fs.readFileSync('/dev/stdin').toString().split(' ')
let [A, B] = input

A = parseInt(A)
B = parseInt(B)

let result = A * B
result = result.toString()

process.stdout.write(result)
