const fs = require('fs')
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')

const S = input[0]
const i = parseInt(input[1])

process.stdout.write(S[i - 1])
