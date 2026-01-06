// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const M = +inputArr[0]
const N = +inputArr[1]

// 소수인지 기록
const isPrime = Array.from({length: 10001}).fill(true)
isPrime[0] = false
isPrime[1] = false

// 소수 체크
for (let i = 2; i <= 100; i++) {
  let temp = i * 2
  while (temp <= 10000) {
    isPrime[temp] = false
    temp += i
  }
}

// 소수 갯수 구하기
let minPrime = 10001
let sumPrime = 0
isPrime.slice(M, N + 1).forEach((val, idx) => {
  if (val) {
    minPrime = Math.min(minPrime, idx + M)
    sumPrime += idx + M
  }
})

// 출력
if (minPrime <= 10000) {
  process.stdout.write(`${sumPrime}\n${minPrime}`)
} //
else {
  process.stdout.write('-1')
}
