// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const VLR = inputArr.map(Number)

process.stdout.write(getLRV(0, VLR.length - 1))

function getLRV(left, right) {
  if (left > right) {
    return ''
  }

  if (left === right) {
    return `${VLR[left]}\n`
  }

  const V = VLR[left]

  const lastLeft = binarySearch(V, left, right)

  return getLRV(left + 1, lastLeft) + getLRV(lastLeft + 1, right) + `${V}\n`
}

// L 의 마지막 인덱스를 찾는다.
function binarySearch(val, left, right) {
  if (left === right) {
    return left
  }

  if (left + 1 === right) {
    if (VLR[right] < val) {
      return right
    } // ::
    else {
      return left
    }
  }

  const mid = Math.floor((left + right) / 2)
  const midVal = VLR[mid]

  if (midVal < val) {
    return binarySearch(val, mid, right)
  } // ::
  else {
    return binarySearch(val, left, mid - 1)
  }
}
