// 입력
const inputArr = require('fs').readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 몇 번째 666 수인지
let cnt = 0
let result = 666

// 연산
while (true) {
  const numArr = result.toString().split('')

  // 6이 연속으로 몇 번 나왔나
  let con6 = 0

  for (let num of numArr) {
    if (num === '6') {
      con6 += 1
    } //
    else {
      con6 = 0
    }

    if (con6 === 3) {
      cnt += 1
      break
    }
  }

  if (cnt === N) {
    process.stdout.write(`${result}`)
    break
  }

  result += 1
}
