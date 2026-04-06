// 입력
const fs = require('fs')
const inputArr = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map(row => row.trim())

// 입력 파싱
const N = +inputArr[0]
const UVArr = inputArr.slice(1).map(row => row.split(' ').map(Number))

const connInfoArr = Array.from({length: N + 1}, () => [])
const parentArr = Array.from({length: N + 1}).fill(-1)

UVArr.forEach(UV => {
  const [U, V] = UV
  connInfoArr[U].push(V)
  connInfoArr[V].push(U)
})

const ROOT_NODE = 1
parentArr[ROOT_NODE] = 0

const [O, X] = DFS(ROOT_NODE)

process.stdout.write(`${Math.min(O, X)}`)

function DFS(now) {
  let nowO = 1
  let nowX = 0

  for (let next of connInfoArr[now]) {
    if (parentArr[next] === -1) {
      parentArr[next] = now
      const [O, X] = DFS(next)
      nowX += O
      nowO += Math.min(O, X)
    }
  }

  return [nowO, nowX]
}
