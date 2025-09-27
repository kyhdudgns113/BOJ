const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split(' ')

const [A, B] = inputs

const intA = parseInt(A)
const intB = parseInt(B)

if (intA > intB) {
  process.stdout.write('>')
} // ::
else if (intA === intB) {
  process.stdout.write('==')
} // ::
else {
  process.stdout.write('<')
}
