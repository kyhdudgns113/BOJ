// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const T = +inputArr[0]
const nArr = inputArr.slice(1).map(Number)

// 소수 여부 저장하기
const isPrime = Array.from({length: 1000001}).fill(true)
isPrime[0] = false
isPrime[1] = false

// 합성수 걸러내기
for (let i = 2; i < 1000; i++) {
  if (isPrime[i]) {
    for (let j = 2; i * j <= 1000000; j++) {
      isPrime[i * j] = false
    }
  }
}

let resultStr = ''
nArr.forEach(n => {
  const halfN = Math.floor(n / 2)

  let result = 0
  for (let dn = 0; dn < halfN; dn++) {
    if (isPrime[halfN - dn] && isPrime[halfN + dn]) result += 1
  }

  resultStr += `${result}\n`
})

process.stdout.write(resultStr)
