// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const stairs = inputArr.slice(1).map(Number)

// 결과 저장할 배열
// resultArr[step][stair] : stair 번째 계단을 밟았고, step 만큼 연달아 계단을 밟은 상태일때, 점수의 최대값
const resultArr = Array.from({length: 2}, () => Array.from({length: 303}, () => 0))

// 초기값 저장
resultArr[0][0] = stairs[0]
resultArr[0][1] = stairs[1]

// Bottom-Up 연산
for (let stair = 0; stair < N - 1; stair++) {
  resultArr[1][stair + 1] = Math.max(resultArr[1][stair + 1], resultArr[0][stair] + stairs[stair + 1])

  if (stair + 2 < N) {
    const bigger = Math.max(resultArr[0][stair], resultArr[1][stair])
    resultArr[0][stair + 2] = Math.max(resultArr[0][stair + 2], bigger + stairs[stair + 2])
  }
}

// 결과값 계산
const result = Math.max(resultArr[0][N - 1], resultArr[1][N - 1])

// 출력
process.stdout.write(`${result}`)
