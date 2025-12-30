const fs = require('fs')
const inputArr = fs.readFileSync('/dev/stdin').toString().split('\n')

const stringArr = inputArr.slice(1)

stringArr.forEach(str => {
  const len = str.length
  process.stdout.write(`${str.charAt(0)}${str.charAt(len - 1)}\n`)
})
