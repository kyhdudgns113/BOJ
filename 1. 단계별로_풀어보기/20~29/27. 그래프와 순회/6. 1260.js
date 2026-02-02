// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M, V] = inputArr[0].trim().split(' ').map(Number)
const pairArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 연결 정보를 우선 Map 형태로 저장장
const mapArr = Array.from({length: N + 1}, () => {
  return {}
})

pairArr.forEach(ab => {
  const [a, b] = ab
  mapArr[a][b] = 1
  mapArr[b][a] = 1
})

// Map 형태로 저장된 정보를 배열로 변환
const connArr = mapArr.map(maps => Object.keys(maps))

const isVisitDFS = Array.from({length: N + 1}).fill(false)
const isVisitBFS = Array.from({length: N + 1}).fill(false)

let resultDFS = ``
let resultBFS = ``

isVisitDFS[V] = true
isVisitBFS[V] = true

// BFS 방문 예정 목록
const nextVisit = Array.from({length: 2000}).fill(0)
let nowIdx = -1
let insertIdx = 0

dfs(V)
bfs(V)

console.log(resultDFS)
console.log(resultBFS)

function dfs(now) {
  isVisitDFS[now] = true
  resultDFS += `${now} `

  connArr[now].forEach(next => {
    if (isVisitDFS[next] === false) {
      dfs(next)
    }
  })
}

function bfs(now) {
  resultBFS += `${now} `
  nowIdx += 1
  connArr[now].forEach(next => {
    if (isVisitBFS[next] === false) {
      isVisitBFS[next] = true
      nextVisit[insertIdx++] = next
    }
  })

  if (nowIdx < insertIdx) {
    const next = nextVisit[nowIdx]
    bfs(next)
  }
}
