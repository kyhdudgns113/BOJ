const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')[0]

const N = +inputs

for (let i = 1; i <= N; i++) {
  process.stdout.write('*'.repeat(i) + '\n')
}
