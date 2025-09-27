const fs = require('fs')
const y = fs.readFileSync('/dev/stdin').toString()

const result = parseInt(y) - 543

process.stdout.write(result.toString())
