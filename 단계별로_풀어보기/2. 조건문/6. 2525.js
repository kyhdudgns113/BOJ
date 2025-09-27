const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split('\n')
const [a, b] = inputs[0].split(' ')
const c = inputs[1]

const [A, B, C] = [parseInt(a), parseInt(b), parseInt(c)]

const ABC = 60 * A + B + C

const hour = Math.floor(ABC / 60) % 24
const minute = ABC % 60

process.stdout.write(`${hour} ${minute}`)
