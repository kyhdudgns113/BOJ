// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, B] = inputArr[0].trim().split(' ').map(BigInt)
const A = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 거듭제곱 저장할 배열
const expArr = Array.from({length: 48}, () => [])

// 배열 초기값 설정
expArr[0] = A

// 배열값 연산
for (let i = 1; i < 48; i++) {
  expArr[i] = matMul(expArr[i - 1], expArr[i - 1])
}

let idx = 0
let remain = B
let result = Array.from({length: +N.toString()}, () => Array.from({length: +N.toString()}).fill(0))

// 단위 행렬로 만들기
result.forEach((row, idx) => row[idx] = 1)

while (remain > 0n) {
  if (remain & 1n) {
    result = matMul(result, expArr[idx])
  }
  idx += 1
  remain = remain >> 1n
}

// 출력
result.forEach(row => {
  console.log(`${row.join(' ')}`)
})


function matMul(matA, matB) {
  const maxN = matA.length
  const maxM = matB.length
  const maxK = matB[0].length

  const result = Array.from({length: maxN}, () => Array.from({length: maxK}).fill(0))

  for (let n = 0; n < maxN; n++) {
    for (let k = 0; k < maxK; k++) {
      for (let m = 0; m < maxM; m++) {
        result[n][k] += matA[n][m] * matB[m][k]
        result[n][k] %= 1000
      }
    }
  }

  return result
}

