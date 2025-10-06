const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().trim().split('\n').map(Number)

const dict = {}

inputs.forEach(num => (dict[(num % 42).toString()] = 1))

process.stdout.write(`${Object.keys(dict).length}`)
