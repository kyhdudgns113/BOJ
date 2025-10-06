const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

const N = +inputs[0]
const numArr = inputs[1].split(' ')
const v = inputs[2]

const result = numArr.filter(num => num === v).length

process.stdout.write(`${result}`)
