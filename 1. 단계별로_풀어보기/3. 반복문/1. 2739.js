const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString()

const N = parseInt(inputs)

for (let i = 1; i <= 9; i++) {
  process.stdout.write(`${N} * ${i} = ${N * i}\n`)
}
