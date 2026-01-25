// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].trim().split(' ').map(Number)
const treeArr = inputArr[1].trim().split(' ').map(Number)

process.stdout.write(`${binarySearch(0, Math.max(...treeArr))}`)

function binarySearch(minLen, maxLen) {
  if (minLen === maxLen) {
    return minLen
  }

  if (minLen + 1 === maxLen) {
    if (getRemain(maxLen) >= M) {
      return maxLen
    }
    return minLen
  }

  const halfLen = Math.floor((minLen + maxLen) / 2)
  const remain = getRemain(halfLen)

  if (remain < M) {
    return binarySearch(minLen, halfLen - 1)
  } // ::
  else if (remain > M) {
    return binarySearch(halfLen, maxLen)
  } // ::
  else {
    return halfLen
  }
}

function getRemain(height) {
  return treeArr.reduce((acc, val) => acc += Math.max(val - height, 0), 0)
}