const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString()
const score = parseInt(inputs)

const scoreDiv10 = Math.floor(score / 10)

let result = ''

switch (scoreDiv10) {
  case 10:
  case 9:
    result = 'A'
    break
  case 8:
    result = 'B'
    break
  case 7:
    result = 'C'
    break
  case 6:
    result = 'D'
    break
  default:
    result = 'F'
    break
}

process.stdout.write(result)
