// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const weightArr = inputArr[1].trim().split(' ').map(Number)

const M = +inputArr[2]
const queryArr = inputArr[3].trim().split(' ').map(Number)

// 해당 무게가 가능한지 여부
const isPossible = Array.from({length: N + 1}, () => Array.from({length: 40001}).fill(false))

// 무게가 0인 경우는 그냥 가능하다.
isPossible[0][0] = true

// 각 추마다 연산
weightArr.forEach((weight, wIdx) => {
  // 만들 수 있었던 무게들에 대해 연산
  for (let w = 0; w + weight <= 40000; w++) {
    if (isPossible[wIdx][w]) {
      isPossible[wIdx + 1][w] = true
      isPossible[wIdx + 1][w + weight] = true
      isPossible[wIdx + 1][Math.abs(w - weight)] = true
    }
  }
})

// 쿼리마다 출력
queryArr.forEach(query => {
  process.stdout.write(`${isPossible[N][query] ? 'Y' : 'N'} `)
})
