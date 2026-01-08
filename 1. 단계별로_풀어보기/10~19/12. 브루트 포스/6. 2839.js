// 입력
const inputArr = require('fs').readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 변수 선언
let result = -1 // 출력할 결과
let cnt3 = 0 // 3kg 를 쓰는 횟수

while (cnt3 * 3 <= N) {
  const remain = N - cnt3 * 3

  if (remain % 5 === 0) {
    result = cnt3 + Math.floor(remain / 5)
    break
  }

  cnt3 += 1
}

process.stdout.write(`${result}`)
