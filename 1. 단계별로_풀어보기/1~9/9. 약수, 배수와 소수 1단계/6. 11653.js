// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
let N = +inputArr[0]

// 최대 인수 구하기
const maxIter = Math.ceil(Math.sqrt(N))

// 소수 체크 배열 구하기
const isPrime = Array.from({length: maxIter + 1}).fill(true)
isPrime[0] = false
isPrime[1] = false

// 소수 체크
for (let i = 2; i <= maxIter; i++) {
  if (isPrime[i]) {
    let temp = i * 2
    while (temp <= maxIter) {
      isPrime[temp] = false
      temp += i
    }
  }
}

for (let i = 2; i <= maxIter; i++) {
  if (isPrime[i]) {
    while (N > 1 && N % i === 0) {
      N = Math.floor(N / i)
      process.stdout.write(`${i}\n`)
    }
  }
}
if (N > 1) {
  process.stdout.write(`${N}`)
}
