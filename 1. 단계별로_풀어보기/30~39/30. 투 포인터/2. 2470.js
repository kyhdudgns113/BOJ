// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const liquidArr = inputArr[1].trim().split(' ').map(Number)

// 우선 오름차순으로 정렬한다.
liquidArr.sort((a, b) => a - b)

// 결과 저장할 변수
let resultSum = 2000000001
let resultLeft = 0
let resultRight = 0

// 양 끝 인덱스
let left = 0
let right = N - 1

while (left < right) {
  let tempSum = liquidArr[left] + liquidArr[right]

  if (Math.abs(tempSum) < resultSum) {
    resultSum = Math.abs(tempSum)
    resultLeft = liquidArr[left]
    resultRight = liquidArr[right]
  }

  if (0 < tempSum) {
    right--
  } // ::
  else {
    left++
  }
}

process.stdout.write(`${resultLeft} ${resultRight}`)
