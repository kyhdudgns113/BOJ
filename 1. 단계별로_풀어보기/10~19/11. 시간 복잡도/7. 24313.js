// 입력
const inputArr = require('fs').readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [a1, a0] = inputArr[0].trim().split(' ').map(Number)
const c = +inputArr[1]
const n0 = +inputArr[2]

// 상수 계산
const nca = n0 * (c - a1)

// 경우에 따른 연산
if (c > a1) {
  process.stdout.write(`${nca >= a0 ? 1 : 0}`)
} //
else if (c === a1) {
  process.stdout.write(`${a0 <= 0 ? 1 : 0}`)
} //
else {
  process.stdout.write(`0`)
}
