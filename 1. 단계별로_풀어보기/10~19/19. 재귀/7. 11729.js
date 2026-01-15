// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 출력 결과 변수
let cnt = 0
let resultStr = ''

// 연산
recursion(N, 1, 3)

// 출력
resultStr = cnt + '\n' + resultStr
process.stdout.write(resultStr)

function recursion(move, from, to) {
  if (move === 1) {
    cnt += 1
    resultStr += `${from} ${to}\n`
    return
  }

  const bias = 6 - from - to

  recursion(move - 1, from, bias)
  recursion(1, from, to)
  recursion(move - 1, bias, to)
}
