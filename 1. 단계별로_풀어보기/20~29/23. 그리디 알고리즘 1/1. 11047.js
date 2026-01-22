// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, K] = inputArr[0].trim().split(' ').map(Number)
const coinArr = inputArr.slice(1).map(Number)

// 내림차순으로 변경
coinArr.reverse()

// 결과 카운팅할 변수
let remain = K
let result = 0
coinArr.forEach(coin => {
  const div = Math.floor(remain / coin)
  result += div
  remain -= div * coin
})

// 결과 출력
process.stdout.write(`${result}`)
