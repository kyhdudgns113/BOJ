// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const cardArr = inputArr[1].split(' ').map(Number)
const M = +inputArr[2]
const testArr = inputArr[3].split(' ').map(Number)

// 가지고 있는 카드 dictionary 에 기록
const dict = {}
cardArr.forEach(card => (dict[card] = true))

// 결과 출력할 변수(출력 함수를 한 번만 부르기 위해 변수화)
let result = ''

// 결과값 구하기
testArr.forEach(card => (result += dict[card] ? '1 ' : '0 '))

// 결과 출력
process.stdout.write(result)
