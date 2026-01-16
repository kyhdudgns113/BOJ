// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].split(' ').map(Number)

// 방문기록 저장
const isVisit = Array.from({length: N + 1}).fill(false)
const printArr = Array.from({length: M}).fill(0)

// 출력 변수
let resultStr = ''

// 연산
for (let nowNum = 1; nowNum <= N; nowNum++) {
  isVisit[nowNum] = true
  recurse(nowNum, 0)
  isVisit[nowNum] = false
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
    if (!isVisit[nextNum]) {
      isVisit[nextNum] = true
      recurse(nextNum, nowIdx + 1)
      isVisit[nextNum] = false
    }
  }
}
