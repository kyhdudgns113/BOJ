const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString()

const year = parseInt(inputs)

const isFour = year % 4 === 0
const isHundred = year % 100 === 0
const isFHundred = year % 400 === 0

const isYunYear = (isFour && !isHundred) || isFHundred

const result = isYunYear ? '1' : '0'

process.stdout.write(result)
