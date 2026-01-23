// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, K] = inputArr[0].split(' ').map(BigInt)

const MOD = 1000000007n

const m = K < N - K ? K : N - K

let upSide = 1n
let downSide = 1n

for (let i = 0n; i < m; i++) {
  upSide = (upSide * (N - i)) % MOD
  downSide = (downSide * (i + 1n)) % MOD
}

// 거듭제곱 배열 (페르마의 소정리용)
const expArr = Array.from({length: 33}).fill(0n)
expArr[0] = 1n
expArr[1] = downSide % MOD

for (let i = 2; i < 33; i++) {
  expArr[i] = (expArr[i - 1] * expArr[i - 1]) % MOD
}

// downSide^(MOD-2) mod MOD 계산
let expResult = 1n
let idx = 1
let remain = MOD - 2n
while (remain > 0n) {
  if (remain & 1n) {
    expResult = (expResult * expArr[idx]) % MOD
  }
  remain = remain >> 1n
  idx++
}

const result = (upSide * expResult) % MOD

process.stdout.write(`${result}`)