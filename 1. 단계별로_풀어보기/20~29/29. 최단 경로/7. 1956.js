// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [V, E] = inputArr[0].trim().split(' ').map(Number)
const UVWArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 최단거리 저장할 배열
const distMatrix = Array.from({length: V + 1}, () => Array.from({length: V + 1}).fill(8000000))

UVWArr.forEach(UVW => {
  const [u, v, w] = UVW
  distMatrix[u][v] = w
})

// 플로이드-와샬 알고리즘 적용
for (let mid = 1; mid <= V; mid++) {
  for (let start = 1; start <= V; start++) {
    for (let end = 1; end <= V; end++) {
      distMatrix[start][end] = Math.min(distMatrix[start][end], distMatrix[start][mid] + distMatrix[mid][end])
    }
  }
}

let result = 8000000

for (let start = 1; start <= V; start++) {
  for (let end = 1; end <= V; end++) {
    result = Math.min(result, distMatrix[start][end] + distMatrix[end][start])
  }
}

if (result === 8000000) {
  process.stdout.write(`-1`)
} // ::
else {
  process.stdout.write(`${result}`)
}
