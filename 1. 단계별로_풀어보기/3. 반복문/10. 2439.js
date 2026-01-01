const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString()

const N = +inputs

for (let i = 1; i <= N; i++) {
  process.stdout.write(' '.repeat(N - i) + '*'.repeat(i) + '\n')
}
