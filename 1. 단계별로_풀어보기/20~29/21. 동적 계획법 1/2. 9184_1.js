// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const testArr = inputArr.map(row => row.split(' ').map(Number)).filter(val => val[0] !== -1 || val[1] !== -1 || val[2] !== -1)

// 저장할 w
const w = Array.from({length: 21}, () => Array.from({length: 21}, () => Array.from({length: 21}, () => false)))

testArr.forEach(test => {
  const [a, b, c] = test
  process.stdout.write(`w(${a}, ${b}, ${c}) = ${getW(a, b, c)}\n`)
})

function getW(a, b, c) {
  if (a <= 0 || b <= 0 || c <= 0) {
    return 1
  }

  if (a > 20 || b > 20 || c > 20) {
    return getW(20, 20, 20)
  }

  if (w[a][b][c] !== false) {
    return w[a][b][c]
  }

  if (a < b && b < c) {
    w[a][b][c] = getW(a, b, c - 1) + getW(a, b - 1, c - 1) - getW(a, b - 1, c)
    return w[a][b][c]
  }

  w[a][b][c] = getW(a - 1, b, c) + getW(a - 1, b - 1, c) + getW(a - 1, b, c - 1) - getW(a - 1, b - 1, c - 1)
  return w[a][b][c]
}
