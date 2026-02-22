// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const treeInfoArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// connArr[i]: i 와 연결된 정점들의 목록
const connArr = Array.from({length: N + 1}, () => [])

treeInfoArr.forEach(info => {
  const [start, end] = info
  connArr[start].push(end)
  connArr[end].push(start)
})

// parentArr[i]: i 의 부모
const parentArr = Array.from({length: N + 1}).fill(-1)
parentArr[1] = 1

// BFS 용 방문큐. 배열로 선언해도 무방하다
const visitQueue = Array.from({length: N + 1}).fill(0)
let nowIdx = 0
let insertIdx = 0

visitQueue[insertIdx++] = 1

while (nowIdx < insertIdx) {
  const now = visitQueue[nowIdx++]

  connArr[now].forEach(next => {
    if (parentArr[next] == -1) {
      parentArr[next] = now
      visitQueue[insertIdx++] = next
    }
  })
}

// 출력 변수. 이거 안하면 시간초과 생길 수 있음
let resultStr = ''

parentArr.slice(2).forEach(parent => (resultStr += `${parent}\n`))

process.stdout.write(resultStr)
