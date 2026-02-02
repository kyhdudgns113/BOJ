// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M, R] = inputArr[0].trim().split(' ').map(Number)
const UVArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 간선 정보 저장할 Map 의 배열
const mapArr = Array.from({length: N + 1}, () => {
  return {}
})

UVArr.forEach(uv => {
  const [u, v] = uv
  mapArr[u][v] = 1
  mapArr[v][u] = 1
})

// 연결된 간선 정보 저장할 배열들의 배열
const vListArr = Array.from({length: N + 1}, () => [])

mapArr.forEach((vMap, mapIdx) => {
  vListArr[mapIdx] = Object.keys(vMap)
  vListArr[mapIdx].sort((a, b) => a - b)
})

// 방문여부 저장할 배열
const isVisit = Array.from({length: N + 1}).fill(0)

// 현재 방문 순서
let nowVisit = 1

// 호출 리스트
const callList = Array.from({length: 400004}).fill(null)

let callIdx = 0
let insertIdx = 0

callList[insertIdx++] = R
isVisit[R] = nowVisit++

while (callIdx < insertIdx) {
  const now = callList[callIdx++]

  vListArr[now].forEach(v => {
    if (isVisit[v] === 0) {
      isVisit[v] = nowVisit++
      callList[insertIdx++] = v
    }
  })
}

isVisit.slice(1).forEach(u => process.stdout.write(`${u}\n`))
