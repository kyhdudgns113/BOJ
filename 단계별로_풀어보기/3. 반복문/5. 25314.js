const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString()

const N = parseInt(inputs)
const Ndiv4 = Math.floor(N / 4)

process.stdout.write(`${'long '.repeat(Ndiv4)}int`)
