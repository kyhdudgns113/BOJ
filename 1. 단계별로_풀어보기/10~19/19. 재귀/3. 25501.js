// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const T = +inputArr[0]
const testArr = inputArr.slice(1).map(row => row.trim())

let cnt = 0

testArr.forEach(test => {
  cnt = 0

  process.stdout.write(`${recursion(test.split(''), 0, test.length - 1)} ${cnt}\n`)
})

function recursion(s, l, r) {
  cnt += 1
  if (l >= r) return 1
  else if (s[l] !== s[r]) return 0
  else return recursion(s, l + 1, r - 1)
}
