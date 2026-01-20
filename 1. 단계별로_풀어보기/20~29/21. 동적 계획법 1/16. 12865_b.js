// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, K] = inputArr[0].split(' ').map(Number)
const WVArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// NULL 을 의미하는 변수
const NULL = -1

// 결과 배열
const resultArr = Array.from({length: N}, () => Array.from({length: K + 1}).fill(NULL))

// 초기값 계싼
resultArr[0][0] = 0

// Bottom-Up 연산
WVArr.forEach((row, idx) => {
  const [w, v] = row

  if (idx === 0) {
    if (w <= K) {
      resultArr[idx][w] = v
    }
    return
  }

  for (let prevW = 0; prevW <= K; prevW++) {
    if (resultArr[idx - 1][prevW] !== NULL) {
      resultArr[idx][prevW] = Math.max(resultArr[idx][prevW], resultArr[idx - 1][prevW])

      if (prevW + w <= K) {
        resultArr[idx][prevW + w] = Math.max(resultArr[idx][prevW + w], resultArr[idx - 1][prevW] + v)
      }
    }
  }
})

// 결과 구하기
const result = Math.max(...resultArr[N - 1], 0)

// 출력
process.stdout.write(`${result}`)