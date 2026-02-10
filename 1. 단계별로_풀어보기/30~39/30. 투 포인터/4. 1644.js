// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 소수인지 여부
const isPrime = Array.from({length: 4000001}).fill(true)
const primeArr = []
isPrime[0] = false
isPrime[1] = false

// 에라토스테네스의 체 알고리즘 적용
// 최대값이 400만이므로, 그의 제곱근인 2000까지의 소수만 확인한다.
for (let i = 2; i < 2000; i++) {
  if (isPrime[i]) {
    for (let j = 2; i * j <= 4000000; j++) {
      isPrime[i * j] = false
    }
  }
}

for (let i = 2; i < 4000000; i++) {
  if (isPrime[i]) {
    primeArr.push(i)
  }
}

// 결과를 저장할 변수
let result = 0

// 투 포인터
let left = 0
let right = 0
let primeSum = primeArr[0]

// 투 포인터 연산
while (left <= right && right < primeArr.length) {
  if (primeSum === N) {
    result++
  }

  if (N < primeSum) {
    primeSum -= primeArr[left++]
  } // ::
  else if (right < primeArr.length - 1) {
    primeSum += primeArr[++right]
  } // ::
  else {
    break
  }

  if (primeArr[left] > N) {
    break
  }
}

process.stdout.write(`${result}`)
