class PriorityQueue {
  constructor(maxLen, cmp) {
    this.maxLen = maxLen
    /**
     * cmp(a, b)
     *   a 가 b 앞에 있어야만 하면 true
     *   둘이 같거나 a 가 뒤에 있어야 하면 false
     */
    this.cmp = cmp
    this.heapArr = Array.from({length: this.maxLen}).fill(null)
    this.heapLen = 0
  }

  pop() {
    if (this.heapLen === 0) {
      return null
    }

    const result = this.heapArr[0]

    this.heapArr[0] = this.heapArr[--this.heapLen]

    let nowIdx = 0

    while (true) {
      const leftIdx = 2 * nowIdx + 1
      const rightIdx = 2 * nowIdx + 2

      if (leftIdx >= this.heapLen) {
        break
      }

      let targetIdx = leftIdx
      if (rightIdx < this.heapLen && this.cmp(this.heapArr[rightIdx], this.heapArr[leftIdx])) {
        targetIdx = rightIdx
      }

      if (this.cmp(this.heapArr[targetIdx], this.heapArr[nowIdx])) {
        const temp = this.heapArr[nowIdx]
        this.heapArr[nowIdx] = this.heapArr[targetIdx]
        this.heapArr[targetIdx] = temp
        nowIdx = targetIdx
      } // ::
      else {
        break
      }
    }

    return result
  }

  push(val) {
    if (this.heapLen === this.maxLen) {
      return false
    }

    this.heapArr[this.heapLen++] = val

    let nowIdx = this.heapLen - 1

    while (nowIdx > 0) {
      const parentIdx = Math.floor((nowIdx - 1) / 2)
      const parentVal = this.heapArr[parentIdx]

      if (this.cmp(val, parentVal) === true) {
        this.heapArr[parentIdx] = val
        this.heapArr[nowIdx] = parentVal
      } // ::
      else {
        break
      }

      nowIdx = parentIdx
    }
    return true
  }

  size() {
    return this.heapLen
  }
  // END OF PQ
}

function cmp(a, b) {
  if (a.dist < b.dist) return true
  else return false
}

// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, E] = inputArr[0].trim().split(' ').map(Number)
const ABCArr = inputArr.slice(1, E + 1).map(row => row.trim().split(' ').map(Number))
const [V1, V2] = inputArr[E + 1].trim().split(' ').map(Number)

// 간선 정보 저장하는 배열
const connectListArr = Array.from({length: N + 1}, () => [])
ABCArr.forEach(ABC => {
  const [A, B, C] = ABC
  connectListArr[A].push([B, C])
  connectListArr[B].push([A, C])
})

// 다익스트라로 필요한 거리들 계산
const dist1ToV1 = dijkstra(1, V1)
const dist1ToV2 = dijkstra(1, V2)
const distV1ToV2 = dijkstra(V1, V2)
const distV1ToN = dijkstra(V1, N)
const distV2ToN = dijkstra(V2, N)

// 두 가지 경로 계산
// 경로1: 1 → v1 → v2 → N
const path1 = dist1ToV1 + distV1ToV2 + distV2ToN
// 경로2: 1 → v2 → v1 → N
const path2 = dist1ToV2 + distV1ToV2 + distV1ToN

const INF = 10000000
let result = Math.min(path1, path2)

if (result >= INF) {
  process.stdout.write('-1')
} // ::
else {
  process.stdout.write(`${result}`)
}

function dijkstra(start, end) {
  if (start === end) {
    return 0
  }
  const minDist = Array.from({length: N + 1}).fill(10000000)
  const isVisit = Array.from({length: N + 1}).fill(false)
  const visitQueue = new PriorityQueue(2 * (N + E) + 1, cmp)

  minDist[start] = 0
  visitQueue.push({now: start, dist: 0})

  while (visitQueue.size() > 0) {
    const {now, dist} = visitQueue.pop()
    if (isVisit[now]) {
      continue
    }

    isVisit[now] = true

    connectListArr[now].forEach(connInfo => {
      const [next, delta] = connInfo

      if (minDist[next] > dist + delta) {
        minDist[next] = dist + delta
        visitQueue.push({now: next, dist: dist + delta})
      }
    })
  }

  return minDist[end]
}
