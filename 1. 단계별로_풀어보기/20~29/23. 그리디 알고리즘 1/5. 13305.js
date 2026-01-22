// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const distanceFrom = inputArr[1].trim().split(' ').map(BigInt)
const costArr = inputArr[2].trim().split(' ').map(BigInt)

// 기름값의 최소값을 저장할 변수
let minCost = 1000000000n

// 누적된 거리를 저장할 변수
let accDist = 0n

// 결과값
let result = 0n

// 첫 번째 주유소부터 연산
distanceFrom.forEach((dist, idx) => {
  const nowCost = costArr[idx]

  // 현재 주유소가 제일 싼 경우
  // - 현재 최소값만큼 지나온 거리에 해당하는 기름을 넣는다.
  // - 현재 최소값을 갱신한다.
  // - 지나온 거리를 초기화 한다.
  if (minCost > nowCost) {
    result += minCost * accDist
    minCost = nowCost
    accDist = dist
  } // ::
  else {
    // 현재 주유소가 더 비싸면 최소값인 주유소에서 더 넣어야 한다.
    accDist += dist
  }
})

// 마지막 주유소까지 갈 기름을 넣는다.
result += minCost * accDist

// 출력
process.stdout.write(`${result}`)
