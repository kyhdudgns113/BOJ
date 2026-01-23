// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = BigInt(inputArr[0])

// 피보나치 결과 저장할 map
const fibMap = {}

// 초기값 연산
fibMap[0] = 0n
fibMap[1] = 1n
fibMap[2] = 1n
fibMap[3] = 2n
fibMap[4] = 3n

process.stdout.write(`${getFibonacci(N)}`)

function getFibonacci(n) {
  if (fibMap[n]) {
    return fibMap[n]
  }

  const half = n / 2n

  if (n % 2n === 0n) {
    const n0 = getFibonacci(half)
    const n1 = getFibonacci(half - 1n)
    fibMap[n] = n0 * (n0 + 2n*n1) % 1000000007n
  } // ::
  else {
    const n0 = getFibonacci(half)
    const n1 = getFibonacci(half + 1n)
    fibMap[n] = (n1 * n1 + n0 * n0) % 1000000007n
  }

  return fibMap[n]
}