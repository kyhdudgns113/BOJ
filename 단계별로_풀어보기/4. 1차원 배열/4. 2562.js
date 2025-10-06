const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')

const numArr = inputs.map(Number)

const maxNumber = Math.max(...numArr)
const maxNumIdx = numArr.indexOf(maxNumber) + 1

process.stdout.write(`${maxNumber}\n${maxNumIdx}`)
