// 입력
const fs = require('fs')
const inputArr = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map(row => row.trim())

// 입력 파싱
const [N, R, Q] = inputArr[0].split(' ').map(Number)
const UVArr = inputArr.slice(1, N).map(row => row.split(' ').map(Number))
const queryArr = inputArr.slice(N).map(Number)

const connInfoArr = Array.from({length: N + 1}, () => [])
const numChilds = Array.from({length: N + 1}).fill(0)
const parentArr = Array.from({length: N + 1}).fill(-1)
parentArr[R] = 0

// 간선정보를 연결정보로 변환
UVArr.forEach(uv => {
  const [U, V] = uv
  connInfoArr[U].push(V)
  connInfoArr[V].push(U)
})

// DFS 로 트리 구성
DFS(R)

// 출력 변수
let resultStr = ''
queryArr.forEach(query => {
  resultStr += `${numChilds[query]}\n`
})

// 출력
process.stdout.write(resultStr)

function DFS(now) {
  numChilds[now] = 1
  connInfoArr[now].forEach(next => {
    if (parentArr[next] === -1) {
      parentArr[next] = now
      numChilds[now] += DFS(next)
    }
  })

  return numChilds[now]
}
