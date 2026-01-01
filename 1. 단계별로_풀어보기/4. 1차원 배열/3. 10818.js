const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

const N = +inputs[0]
const numArr = inputs[1].split(' ').map(Number)

process.stdout.write(`${Math.min(...numArr)} ${Math.max(...numArr)}`)
