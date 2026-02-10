// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const A = inputArr[1].trim().split(' ').map(Number)
const X = +inputArr[2]

// 우선 정렬한다.
A.sort((a, b) => a - b)

// 왼쪽 끝, 오른쪽 끝을 가리킬 변수
let left = 0
let right = A.length - 1

// 결과 변수
let result = 0

// 왼쪽이 더 작은동안 계속 반복한다.
while (left < right) {
  if (A[left] + A[right] === X) {
    result++
    left++
    right--
  } // ::
  else if (A[left] + A[right] < X) {
    left++
  } // ::
  else {
    right--
  }
}

process.stdout.write(`${result}`)
