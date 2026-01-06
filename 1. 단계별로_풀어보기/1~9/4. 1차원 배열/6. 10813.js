const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

const [N, M] = inputs[0].split(' ').map(val => +val)

const resultArr = Array(N)
  .fill(0)
  .map((_, idx) => idx + 1)

for (let idx = 1; idx <= M; idx++) {
  const [i, j] = inputs[idx].split(' ').map(val => +val)

  const temp = resultArr[i - 1]
  resultArr[i - 1] = resultArr[j - 1]
  resultArr[j - 1] = temp
}

process.stdout.write(`${resultArr.join(' ')}`)
