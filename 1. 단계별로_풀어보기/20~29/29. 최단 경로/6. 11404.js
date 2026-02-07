// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const M = +inputArr[1]
const busInfoArr = inputArr.slice(2).map(row => row.trim().split(' ').map(Number))

// 비용을 저장할 배열
const resultMatrix = Array.from({length: N + 1}, () => Array.from({length: N + 1}).fill(100000000))

busInfoArr.forEach(busInfo => {
  const [start, end, cost] = busInfo
  resultMatrix[start][end] = Math.min(resultMatrix[start][end], cost)
})

for (let i = 1; i <= N; i++) {
  resultMatrix[i][i] = 0
}

// 플로이드-와샬 알고리즘 적용
for (let mid = 1; mid <= N; mid++) {
  for (let start = 1; start <= N; start++) {
    for (let end = 1; end <= N; end++) {
      resultMatrix[start][end] = Math.min(resultMatrix[start][end], resultMatrix[start][mid] + resultMatrix[mid][end])
    }
  }
}

// 출력. 인덱스 0은 스킵해야한다.
resultMatrix.slice(1).forEach(row => {
  process.stdout.write(
    `${row
      .slice(1)
      .map(val => (val === 100000000 ? 0 : val))
      .join(' ')}\n`
  )
})
