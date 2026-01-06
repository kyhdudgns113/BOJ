const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

const N = +inputs[0]

let sums = 0
let maxNum = 0

inputs[1]
  .trim()
  .split(' ')
  .forEach(val => {
    const numb = +val
    sums += numb
    maxNum = Math.max(maxNum, numb)
  })

process.stdout.write(`${((sums / maxNum) * 100) / N}`)
