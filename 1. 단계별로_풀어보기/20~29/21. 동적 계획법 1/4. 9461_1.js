// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const T = +inputArr[0]
const testArr = inputArr.slice(1).map(Number)

// 결과 저장할 변수
const P = Array.from({length: 101}, () => -1)

// 종료 조건의 값 미리 선언
P[1] = 1
P[2] = 1
P[3] = 1
P[4] = 2
P[5] = 2

// 출력 변수
let resultStr = ''

// 테스트 케이스마다 연산
testArr.forEach(test => {
  resultStr += getP(test) + '\n'
})

// 출력
process.stdout.write(resultStr)

function getP(n) {
  if (P[n] !== -1) {
    return P[n]
  }

  P[n] = getP(n - 1) + getP(n - 5)
  return P[n]
}
