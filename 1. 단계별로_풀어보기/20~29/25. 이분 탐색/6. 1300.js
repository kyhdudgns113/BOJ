// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = BigInt(inputArr[0])
const K = BigInt(inputArr[1])

// 결과 연산
let result = binarySearch(0n, 10000000000n > N * N ? N * N : 1000000000n)

process.stdout.write(`${result}`)

function binarySearch(minVal, maxVal) {
  if (minVal === maxVal) {
    return minVal
  }

  if (minVal + 1n === maxVal) {
    if (findLessCnt(maxVal) < K) {
      return maxVal
    }
    return minVal
  }

  const midVal = (minVal + maxVal) / 2n

  if (findLessCnt(midVal) > K - 1n) {
    return binarySearch(minVal, midVal - 1n)
  } // ::
  else {
    return binarySearch(midVal, maxVal)
  }
}

function findLessCnt(val) {
  let result = 0n
  for (let i = 1n; i <= N; i++) {
    if (val > N * i) {
      result += N
    } // ::
    else if (val > i) {
      result += (val - 1n) / i
    } // ::
    else {
      break
    }
  }

  return result
}
