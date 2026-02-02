// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M, R] = inputArr[0].trim().split(' ').map(Number)
const UVArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 방문여부 저장 배열
const isVisit = Array.from({length: N + 1}).fill(false)

// 간선들의 map 을 저장하는 배열
const mapArr = Array.from({length: N + 1}, () => {
  return {}
})

UVArr.forEach(uv => {
  const [u, v] = uv
  mapArr[u][v] = 1
  mapArr[v][u] = 1
})

// 간선들의 배열을 저장하는 배열
const vArr = Array.from({length: N + 1}, () => [])

// 간선들의 정보를 저장
mapArr.forEach((mapElem, u) => {
  vArr[u] = Object.keys(mapElem)
  vArr[u].sort((a, b) => b - a)
})

// 방문한 순서 갱신할 변수
let visitCnt = 1

// 깊이 우선 탐색 수행
dfs(R)

// 출력 변수
let resultStr = ''

// 방문순서 구하기
isVisit.slice(1).forEach(val => {
  if (val === false) {
    resultStr += '0\n'
  } // ::
  else {
    resultStr += val + '\n'
  }
})

// 출력
process.stdout.write(resultStr)

function dfs(now) {
  // 방문 표시
  isVisit[now] = visitCnt++

  vArr[now].forEach(v => {
    if (isVisit[v] === false) {
      dfs(v)
    }
  })
}
