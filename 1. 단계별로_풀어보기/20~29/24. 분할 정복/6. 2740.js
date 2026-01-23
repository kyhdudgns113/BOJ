// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].trim().split(' ').map(Number)
const A = inputArr.slice(1, N + 1).map(row => row.trim().split(' ').map(Number))
const K = inputArr[N + 1].trim().split(' ').map(Number)[1]
const B = inputArr.slice(N + 2).map(row => row.trim().split(' ').map(Number))

const result = matMul(A, B)

// 출력 변수. 이 쯤 되니 강박증같음
let resultStr = ''
result.forEach(row => resultStr += row.join(' ') + '\n')

// 출력
process.stdout.write(resultStr)


function matMul(matA, matB) {
  const N = matA.length
  const M = matB.length
  const K = matB[0].length

  const result = Array.from({length: N}, () => Array.from({length: K}).fill(0))

  for (let n = 0; n < N; n++) {
    for (let k = 0; k < K; k++) {
      for (let m = 0; m < M; m++) {
        result[n][k] += matA[n][m] * matB[m][k]
      }
    }
  }

  return result
}

