const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

inputArr.forEach(inputStr => {
  const [A, B] = inputStr.split(' ').map(Number)

  if (A === 0 && B === 0) return

  let result = ''

  // factor
  if (B % A === 0) {
    result = 'factor'
  } //
  else if (A % B === 0) {
    result = 'multiple'
  } //
  else {
    result = 'neither'
  }
  process.stdout.write(result + '\n')
})
