const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString()

const n = parseInt(inputs)

let sums = 0

for (let i = 1; i <= n; i++) {
  sums += i
}

process.stdout.write(`${sums}`)
