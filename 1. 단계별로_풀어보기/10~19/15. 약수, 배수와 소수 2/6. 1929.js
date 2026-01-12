// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [M, N] = inputArr[0].split(' ').map(Number)

// 소수인지 저장할 배열
const isPrime = Array.from({length: 1000001}).fill(true)
isPrime[0] = false
isPrime[1] = false

// 소수인지 판별
for (let i = 2; i <= 1000; i++) {
  if (isPrime[i]) {
    let j = 2

    while (i * j <= 1000000) {
      isPrime[i * j] = false
      j += 1
    }
  }
}

// 소수들만 필터링
const primeArr = isPrime
  .map((val, idx) => {
    return {val, idx}
  })
  .filter(elem => elem.val && M <= elem.idx && elem.idx <= N)
  .map(elem => elem.idx)

let result = ''
primeArr.forEach(val => (result += `${val}\n`))

process.stdout.write(result)
