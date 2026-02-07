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
const [V, E] = inputArr[0].trim().split(' ').map(Number)
const K = +inputArr[1]
const UVWArr = inputArr.slice(2).map(row => row.trim().split(' ').map(Number))

// 본인과 연결된 정점들의 목록을 저장
const connectListArr = Array.from({length: V + 1}, () => [])
UVWArr.forEach(UVW => {
  const [U, V, W] = UVW
  connectListArr[U].push({next: V, dist: W})
})

// 방문했는지 여부를 저장할 배열
const isVisit = Array.from({length: V + 1}).fill(false)

// 정점까지 최단거리를 저장할 배열
// 초기에는 이론상 최대값을 넘는 V * 11(W 의 최대값)
const distArr = Array.from({length: V + 1}).fill(11 * V)
distArr[K] = 0

// 방문큐. 가장 거리가 짧은것부터 계산해야 하므로 우선순위큐로 한다.
const visitQueue = new PriorityQueue(E + V + 1, cmp)

// 방문큐에 시작점과 연결된 점들을 넣는다.
visitQueue.push({now: K, dist: 0})
distArr[K] = 0

while (visitQueue.size() > 0) {
  const {now, dist} = visitQueue.pop()

  if (isVisit[now]) {
    continue
  }

  isVisit[now] = true

  connectListArr[now].forEach(connInfo => {
    const {next, dist: delta} = connInfo

    if (distArr[next] > dist + delta) {
      distArr[next] = dist + delta
      visitQueue.push({now: next, dist: dist + delta})
    }
  })
}

// 출력 변수. 출력함수를 최대한 덜 호출하기 위함
let resultStr = ''

distArr.slice(1).forEach(val => {
  if (val === 11 * V) {
    resultStr += 'INF\n'
  } // ::
  else {
    resultStr += val + '\n'
  }
})

process.stdout.write(resultStr)
