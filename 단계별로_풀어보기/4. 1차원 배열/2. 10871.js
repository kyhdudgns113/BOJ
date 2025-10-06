const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

const [N, X] = inputs[0].split(' ').map(Number)
const numArr = inputs[1].split(' ').map(Number)

const resultArr = numArr.filter(num => num < X)

process.stdout.write(resultArr.join(' '))
