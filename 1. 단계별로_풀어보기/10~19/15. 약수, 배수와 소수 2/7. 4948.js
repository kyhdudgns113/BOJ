// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().split('\n')

// 입력 파싱
const nArr = inputArr.map(Number)

// 소수 여부 저장
const isPrime = Array.from({length: 250000}).fill(true)
isPrime[0] = false
isPrime[1] = false

// 합성수들 찾기
for (let i = 2; i <= 500; i++) {
  if (isPrime[i]) {
    for (let j = 2; i * j < 250000; j++) {
      isPrime[i * j] = false
    }
  }
}

// 테스트 케이스마다 결과 구하기
let resultStr = ''
nArr.forEach(n => {
  if (n === 0) return

  const result = isPrime.slice(n + 1, 2 * n + 1).filter(val => val).length
  resultStr += `${result}\n`
})

// 출력
process.stdout.write(resultStr)
