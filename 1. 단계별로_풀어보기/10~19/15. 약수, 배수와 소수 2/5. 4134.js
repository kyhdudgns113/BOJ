// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const T = +inputArr[0]
const testCases = inputArr.slice(1).map(Number)

// 소수인지 여부 배열
const isPrime = Array.from({length: 65536}).fill(true)
isPrime[0] = false
isPrime[1] = false

for (let i = 2; i < 65536; i++) {
  if (isPrime[i]) {
    let j = 2
    while (i * j < 65536) {
      isPrime[i * j] = false
      j += 1
    }
  }
}

// 소수 배열 구하기
const primeArr = isPrime
  .map((val, idx) => {
    return {val, idx}
  })
  .filter(elem => elem.val)
  .map(elem => elem.idx)
const primeLen = primeArr.length

// 테스트 케이스마다 연산
testCases.forEach(n => {
  let dn = 0
  if (n < 2) {
    process.stdout.write('2\n')
  } //
  else {
    while (true) {
      const result = n + dn
      let pIdx = 0
      for (pIdx = 0; pIdx < primeLen; pIdx++) {
        if (result % primeArr[pIdx] === 0 || result === primeArr[pIdx]) break
      }

      if (pIdx === primeLen || result === primeArr[pIdx]) {
        process.stdout.write(`${result}\n`)
        break
      }
      dn += 1
    }
  }
})
