// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const numArr = inputArr.slice(1).map(row => +row)

// 등장횟수 카운팅하는 배열
const cntArr = Array.from({length: 8002}).fill(0)
const delta = 4000

// 결과 변수들
let maxNum = -9999
let minNum = 9999
let sum = 0
let maxCnt = 0

// 연산
numArr.forEach(num => {
  cntArr[num + delta] += 1
  maxCnt = Math.max(maxCnt, cntArr[num + delta])
  maxNum = Math.max(maxNum, num)
  minNum = Math.min(minNum, num)
  sum += num
})

// 중앙값 구하기 위한 정렬
numArr.sort((a, b) => a - b)

// 최빈값들 걸러내기
const freqArr = cntArr.map((cnt, idx) => [cnt, idx - delta]).filter(val => val[0] === maxCnt)

// 출력할 최빈값 계산
const freqNum = freqArr.length > 1 ? freqArr[1][1] : freqArr[0][1]

// 결과 출력
process.stdout.write(`${Math.round(sum / N)}\n${numArr[Math.floor(N / 2)]}\n${freqNum}\n${numArr[N - 1] - numArr[0]}`)
