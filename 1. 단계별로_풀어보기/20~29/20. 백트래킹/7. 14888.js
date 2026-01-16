// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const A = inputArr[1].split(' ').map(Number)
const ops = inputArr[2].split(' ').map(Number)

// 결과 변수
let resultMax = -1234567890
let resultMin = 1234567890

recurse(0, A[0])

process.stdout.write(`${resultMax}\n${resultMin}`)

function recurse(nowIdx, value) {
  if (nowIdx === N - 1) {
    resultMax = Math.max(resultMax, value)
    resultMin = Math.min(resultMin, value)
    return
  }

  for (let opIdx = 0; opIdx < 4; opIdx++) {
    if (ops[opIdx] > 0) {
      ops[opIdx]--
      const nextVal = operate(value, A[nowIdx + 1], opIdx)
      recurse(nowIdx + 1, nextVal)
      ops[opIdx]++
    }
  }
}

function operate(a, b, opIdx) {
  if (opIdx === 0) {
    return a + b
  }

  if (opIdx === 1) {
    return a - b
  }

  if (opIdx === 2) {
    return a * b
  }

  if (opIdx === 3) {
    if (a * b >= 0) {
      return Math.floor(a / b)
    } // ::
    else {
      return -Math.floor(-a / b)
    }
  }
}
