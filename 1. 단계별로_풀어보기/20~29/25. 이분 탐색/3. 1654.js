// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [K, N] = inputArr[0].trim().split(' ').map(Number)
const lineArr = inputArr.slice(1).map(Number)

// 길이의 최대값 구하기
const maxLen = Math.max(...lineArr)

process.stdout.write(`${binarySearch(0, maxLen)}`)


function binarySearch(minLen, maxLen) {
  if (minLen === maxLen) {
    return minLen
  }

  if (minLen + 1 === maxLen) {
    if (getSticks(maxLen) === N) {
      return maxLen
    }
    return minLen
  }

  const half = Math.floor((minLen + maxLen) / 2)

  if (getSticks(half) >= N) {
    return binarySearch(half, maxLen)
  } // ::
  else {
    return binarySearch(minLen, half)
  }
}

function getSticks(div) {
  return lineArr.reduce((prev, val) => prev += Math.floor(val / div), 0)
}