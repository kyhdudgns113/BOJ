// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const equation = inputArr[0].trim().split('')

// - 나온적 있는지 저장하는 변수
let isMinus = false

// 결과값 저장하는 변수
let result = 0
let nowNum = 0

// '0' 의 아스키코드
const zero = '0'.charCodeAt(0)
const nine = '9'.charCodeAt(0)

// 문자마다 연산
equation.forEach(char => {
  const c = char.charCodeAt(0)

  // 숫자면 현재 숫자를 갱신한다.
  if (zero <= c && c <= nine) {
    nowNum *= 10
    nowNum += +char
  } // ::
  else {
    // 숫자가 아니면 연산을 수행하고 연산자를 바꾼다.
    if (isMinus) {
      result -= nowNum
    } // ::
    else {
      result += nowNum
    }
    nowNum = 0

    if (char === '-') {
      isMinus = true
    }
  }
})

// 마지막 현재값을 연산한다.
result += isMinus ? -nowNum : nowNum

// 출력
process.stdout.write(`${result}`)
