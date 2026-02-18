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
  if (a[1] < b[1]) return true
  else return false
}

// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const M = +inputArr[1]
const busInfoArr = inputArr.slice(2, M + 2).map(row => row.trim().split(' ').map(Number))
const [first, last] = inputArr[M + 2].trim().split(' ').map(Number)

// connectArr[i] : i 에서 시작하는 버스정보 [도착점, 코스트] 의 배열
// resultArr[i] : start 에서 i 까지 가는 최소비용
// prevArr[i] : start 에서 i 까지 이동할때, i 직전에 방문하는곳
// visitQueue: 다익스트라용 우선순위 큐
const connectArr = Array.from({length: N + 1}, () => [])
const resultArr = Array.from({length: N + 1}).fill(200000000)
const prevArr = Array.from({length: N + 1}).fill(-1)
const visitQueue = new PriorityQueue(300000, cmp)

// busInfoArr -> connectArr
busInfoArr.forEach(row => {
  const [start, end, cost] = row
  connectArr[start].push([end, cost])
})

// resultArr 초기화
resultArr[first] = 0

// 우선순위 큐에 시작점 넣기
visitQueue.push([first, resultArr[first]])

while (visitQueue.size() > 0) {
  const [now, nowDist] = visitQueue.pop()

  if (nowDist > resultArr[now]) {
    continue
  }

  connectArr[now].forEach(connInfo => {
    const [next, cost] = connInfo

    if (resultArr[next] > nowDist + cost) {
      resultArr[next] = nowDist + cost
      prevArr[next] = now
      visitQueue.push([next, nowDist + cost])
    }
  })
}

// 경로를 출력할 배열 만들기(역순으로 삽입후 순서를 뒤집음)
let now = last
const printArr = []
while (now !== -1) {
  printArr.push(now)
  now = prevArr[now]
}
printArr.reverse()

process.stdout.write(`${resultArr[last]}\n`)
process.stdout.write(`${printArr.length}\n`)
process.stdout.write(`${printArr.join(' ')}\n`)
