const fs = require('fs')
const inputs = fs.readFileSync('/dev/stdin').toString().split(' ')

const [h, m] = inputs

const [H, M] = [parseInt(h), parseInt(m)]

const sumHM = 60 * H + M + 1440
const resultHM = sumHM - 45

const resultH = Math.floor(resultHM / 60) % 24
const resultM = resultHM % 60

process.stdout.write(resultH.toString() + ' ' + resultM.toString())
