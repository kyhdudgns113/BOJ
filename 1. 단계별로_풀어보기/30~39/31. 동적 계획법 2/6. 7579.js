// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].trim().split(' ').map(Number)
const A = inputArr[1].trim().split(' ').map(Number)
const C = inputArr[2].trim().split(' ').map(Number)

// 코스트마다 최대 메모리 저장할 배열
const resultArr = Array.from({length: N + 1}, () => Array.from({length: 10001}).fill(0))

for (let i = 0; i < N; i++) {
  const mem = A[i]
  const cost = C[i]

  resultArr[i + 1][cost] = mem

  for (let c = 0; c + cost <= 10000; c++) {
    if (resultArr[i][c] > 0) {
      resultArr[i + 1][c] = Math.max(resultArr[i + 1][c], resultArr[i][c])
      resultArr[i + 1][c + cost] = Math.max(resultArr[i + 1][c + cost], resultArr[i][c] + mem)
    }
  }
}

for (let cost = 0; cost <= 10000; cost++) {
  if (resultArr[N][cost] >= M) {
    process.stdout.write(`${cost}`)
    break
  }
}
