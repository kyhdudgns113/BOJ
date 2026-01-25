// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, C] = inputArr[0].trim().split(' ').map(Number)
const houseArr = inputArr.slice(1).map(Number)

// 집의 위치대로 정렬
houseArr.sort((a, b) => a - b)

// 결과 구하기
let result = binarySearch(1, houseArr[N - 1] - houseArr[0])

// 출력
process.stdout.write(`${result}`)


function binarySearch(minDist, maxDist) {
  if (minDist === maxDist) {
    return minDist
  }

  if (minDist + 1 === maxDist) {
    if (isWiFiSettable(maxDist)) {
      return maxDist
    }
    return minDist
  }

  const halfDist = Math.floor((minDist + maxDist) / 2)
  if (isWiFiSettable(halfDist)) {
    // 거리를 halfDist 이상으로 설치가 가능하다면 halfDist 포함 그 이후중에서 찾는다.
    return binarySearch(halfDist, maxDist)
  } // ::
  else {
    // 그게 아니면 halfDist 보다 작은 범위에서 찾는다.
    // 앞서 종료조건에서 minDist 와 maxDist 의 차이가 1일때를 처리했다
    //  - halfDist 는 minDist 보다 무조건 더 크다.
    return binarySearch(minDist, halfDist - 1)
  }
}

function isWiFiSettable(dist) {
  let accDist = 0
  let remainWiFi = C - 1 // 0번째 집에는 필수로 설치한다

  for (let i = 1; i < N; i++) {
    accDist += houseArr[i] - houseArr[i - 1]
    if (accDist >= dist) {
      accDist = 0
      remainWiFi--

      if (remainWiFi === 0) {
        return true
      }
    }
  }

  return false
}