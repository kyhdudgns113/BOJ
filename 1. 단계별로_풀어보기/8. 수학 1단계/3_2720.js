// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 입력 파싱
const T = +inputArr[0]
const CArr = inputArr.slice(1).map(Number)

// 거스름마다 계산 (그리디 알고리즘)
// prettier-ignore
CArr.forEach(C => {
  let cnt25 = 0, cnt10 = 0, cnt5 = 0, cnt1 = 0

  // 25센트 계산
  while (C >= 25) {
    cnt25 += 1
    C -= 25
  }

  // 10센트 계산
  while (C >= 10) {
    cnt10 += 1
    C -= 10
  }

  // 5센트 계산
  while(C >= 5) {
    cnt5 += 1
    C -= 5
  }

  // 1센트 계산
  cnt1 += C

  // 출력
  process.stdout.write(`${cnt25} ${cnt10} ${cnt5} ${cnt1}\n`)  
})
