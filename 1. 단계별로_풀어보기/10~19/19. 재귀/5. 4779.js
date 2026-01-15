// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const NArr = inputArr.map(row => +row)

// 출력 변수
let result = ''

NArr.forEach(N => {
  result += recursion(N) + '\n'
})

process.stdout.write(result)

function recursion(n) {
  if (n === 0) return '-'

  return recursion(n - 1) + ' '.repeat(Math.pow(3, n - 1)) + recursion(n - 1)
}
