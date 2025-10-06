const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n').map(Number)

for (let i = 1; i <= 30; i++) {
  if (!inputs.includes(i)) {
    process.stdout.write(`${i}\n`)
  }
}
