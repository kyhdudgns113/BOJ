const fs = require('fs')
const inputs = fs.readFileSync(0, 'utf-8').toString().split('\n')
// const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

const [a, b] = inputs

const A = parseInt(a)
const B = parseInt(b)

let result = ''

if (A > 0) {
  if (B > 0) {
    result = '1'
  } // ::
  else {
    result = '4'
  }
} // ::
else {
  if (B > 0) {
    result = '2'
  } // ::
  else {
    result = '3'
  }
}

process.stdout.write(result)
