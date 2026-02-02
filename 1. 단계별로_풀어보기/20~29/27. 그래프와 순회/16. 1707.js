// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
let remainRow = 0
const K = +inputArr[0]
const queryArr = inputArr
  .slice(1)
  .map((row, rowIdx) => {
    if (remainRow === 0) {
      const [V, E] = row.trim().split(' ').map(Number)
      const UVArr = inputArr.slice(2 + rowIdx, 2 + rowIdx + E).map(rrow => rrow.trim().split(' ').map(Number))
      remainRow = E
      return [V, E, UVArr]
    } // ::
    else {
      remainRow--
      return null
    }
  })
  .filter(row => row !== null)

// BFS 용 글로벌 변수
let connectArr = []
let isVisit = []

// BFS 용 방문큐를 배열로 만든다.
let visitQueue = Array.from({length: 20000}).fill(null)

queryArr.forEach(query => {
  const [V, E, UVArr] = query

  const mapArr = Array.from({length: V + 1}, () => {
    return {}
  })

  UVArr.forEach(UV => {
    const [u, v] = UV
    mapArr[u][v] = 1
    mapArr[v][u] = 1
  })

  connectArr = mapArr.map(mapInfo => {
    return Object.keys(mapInfo)
  })

  // 팀은 0 아니면 1로 나눈다. 팀 결정 안됬으면 -1 이다.
  isVisit = Array.from({length: V + 1}).fill(-1)

  // 결과 변수
  let result = ''

  for (let node = 1; node <= V; node++) {
    if (isVisit[node] === -1) {
      isVisit[node] = 0
      result = BFS(node)

      if (result === 'NO') {
        break
      }
    }
  }

  process.stdout.write(`${result}\n`)
})

function BFS(start) {
  // BFS 용 큐의 초기 인덱스를 설정한다.
  let nowIdx = 0
  let insertIdx = 0

  // 시작지점 now 를 방문큐에 넣고 0팀으로 설정한다.
  visitQueue[insertIdx++] = start
  isVisit[start] = 0

  // 결과
  let result = 'YES'

  // BFS 연산
  while (nowIdx < insertIdx) {
    const now = visitQueue[nowIdx++]
    const nowTeam = isVisit[now]

    connectArr[now].forEach(next => {
      if (isVisit[next] === -1) {
        isVisit[next] = 1 - nowTeam
        visitQueue[insertIdx++] = next
      } // ::
      else if (isVisit[next] === nowTeam) {
        result = 'NO'
      }
    })

    if (result === 'NO') {
      break
    }
  }

  return result
}
