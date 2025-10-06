const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

const [N, M] = inputs[0].split(' ').map(Number)

const resultArr = Array(N)
  .fill(0)
  .map((_, idx) => idx + 1)

for (let idx = 0; idx < M; idx++) {
  const [i, j] = inputs[idx + 1].split(' ').map(Number)

  const partArr = resultArr.slice(i - 1, j)
  partArr.reverse()
  resultArr.splice(i - 1, j - i + 1, ...partArr)
}

process.stdout.write(`${resultArr.join(' ')}`)
