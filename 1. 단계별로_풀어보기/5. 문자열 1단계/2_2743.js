const fs = require('fs')
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n')[0]
const result = input.length

process.stdout.write(`${result}`)
