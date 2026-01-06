const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString()
const score = parseInt(inputs)

if (score >= 90) {
  process.stdout.write('A')
} // ::
else if (score >= 80) {
  process.stdout.write('B')
} // ::
else if (score >= 70) {
  process.stdout.write('C')
} // ::
else if (score >= 60) {
  process.stdout.write('D')
} // ::
else {
  process.stdout.write('F')
}
