const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

const [N, M] = inputs[0].split(' ').map(Number)

const basketArr = Array(N).fill(0)

for (let idx = 0; idx < M; idx++) {
  const [i, j, k] = inputs[idx + 1].split(' ').map(Number)

  for (let bIdx = i - 1; bIdx < j; bIdx++) {
    basketArr[bIdx] = k
  }
}

process.stdout.write(`${basketArr.join(' ')}`)
