// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 입력 파싱
let [N, B] = inputArr[0].trim().split(' ')

const nArr = N.split('')
const bNum = +B

// 출력할 결과 변수
let result = 0

// '0', '9', 'A' 의 아스키코드를 구한다.
// A만 구해도 되기는 하지만 코드 가독성을 위해 다 구해둔다.
// 반복해서 사용할 예정이기에 미리 계산해둔다.
const zeroAscii = '0'.charCodeAt(0)
const nineAscii = '9'.charCodeAt(0)
const aAscii = 'A'.charCodeAt(0)

nArr.forEach(char => {
  // 기존 숫자는 진법 수만큼 곱해져야 한다
  result *= bNum

  // c 가 숫자인 경우와 문자인 경우를 구분하여 연산한다.
  const charAscii = char.charCodeAt(0)

  if (zeroAscii <= charAscii && charAscii <= nineAscii) {
    // 숫자인 경우
    result += charAscii - zeroAscii
  } //
  else {
    // 문자인 경우, 10을 추가로 더해야 한다
    result += charAscii - aAscii + 10
  }
})

process.stdout.write(`${result}`)
