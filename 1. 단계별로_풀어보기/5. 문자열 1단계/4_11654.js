const fs = require('fs')

const input = fs.readFileSync('/dev/stdin').toString().trim()

// process.stdout.write(`${input.charCodeAt(0)}`)

const tEncoder = new TextEncoder()
const u8Arr = tEncoder.encode(input)

process.stdout.write(`${u8Arr[0]}`)
