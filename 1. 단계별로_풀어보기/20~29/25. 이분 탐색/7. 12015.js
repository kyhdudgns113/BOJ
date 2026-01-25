// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const A = inputArr[1].trim().split(' ').map(Number)

// 짝퉁 부분수열 저장할 변수
const partArr = Array.from({length: N + 1}).fill(0)
let arrLen = 0

// 앞 순서부터 연산
A.forEach(a => {
  const myIdx = findPlace(a, 0, arrLen)
  partArr[myIdx] = a
  if (arrLen === myIdx) {
    arrLen++
  }
})

// 출력
process.stdout.write(`${arrLen}`)

function findPlace(val, minIdx, maxIdx) {
  if (minIdx === maxIdx) {
    return minIdx
  }

  if (minIdx + 1 === maxIdx) {
    if (arrLen === minIdx || val <= partArr[minIdx]) {
      return minIdx
    }
    return maxIdx
  }

  const halfIdx = Math.floor((minIdx + maxIdx) / 2)
  const midVal = partArr[halfIdx]

  if (val === midVal) {
    return halfIdx
  } // ::
  else if (val < midVal) {
    return findPlace(val, minIdx, halfIdx)
  } // ::
  else {
    return findPlace(val, halfIdx + 1, maxIdx)
  }
}
