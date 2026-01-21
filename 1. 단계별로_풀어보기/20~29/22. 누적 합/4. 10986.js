// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].trim().split(' ').map(Number)
const A = inputArr[1].trim().split(' ').map(Number)

// 누적 모듈러 배열 생성
const modArr = Array.from({length: N + 1}).fill(0)

// 나머지값들 얼마나 있는지 카운팅할 배열 생성
const cntArr = Array.from({length: M}).fill(0)
cntArr[0] = 1

// 배열에 값 연산
for (let i = 1; i <= N; i++) {
  modArr[i] = (modArr[i - 1] + A[i - 1]) % M
  cntArr[modArr[i]] += 1
}

// 결과 계산
const result = Math.floor(cntArr.reduce((prev, val) => (prev += (val * (val - 1)) / 2), 0))

// 출력
process.stdout.write(`${result}`)
