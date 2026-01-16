// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].split(' ').map(Number)

// 출력 배열
const printArr = Array.from({length: M}).fill(0)

// 출력 변수
let resultStr = ''

// 연산
for (let nowNum = 1; nowNum <= N; nowNum++) {
  recurse(nowNum, 0)
}

// 출력
process.stdout.write(resultStr)

function recurse(nowNum, nowIdx) {
  printArr[nowIdx] = nowNum

  if (nowIdx === M - 1) {
    resultStr += printArr.join(' ') + '\n'
    return
  }

  for (let nextNum = 1; nextNum <= N; nextNum++) {
    recurse(nextNum, nowIdx + 1)
  }
}
