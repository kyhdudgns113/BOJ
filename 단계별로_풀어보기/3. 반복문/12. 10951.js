const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

inputs.forEach(row => {
  if (row.length > 0) {
    const arrs = row.split(' ')
    const [A, B] = [+arrs[0], +arrs[1]]
    process.stdout.write(`${A + B}\n`)
  }
})
