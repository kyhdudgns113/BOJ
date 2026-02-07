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
  if (a.seconds < b.seconds) return true
  else return false
}

// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, K] = inputArr[0].trim().split(' ').map(Number)

/**
 * 몇초만에 도착하는지 저장할 배열
 * - 크기를 20만정도로 했다.
 *     + 최대값 너머로 점프했다가 -1씩 이동하는 경우도 고려
 * - 초기값은 30만으로 했다.
 *     + 어떠한 경우에도 30만초나 걸리지 않는다.
 *     + min 연산을 쉽게 적용하기 위함
 */
const isVisit = Array.from({length: 200001}).fill(300000)
isVisit[N] = 0

/**
 * 우선순위큐로 선언되는 방문큐
 * 각 숫자가 여러번 저장될 수 있음에 유의한다.
 *
 * 예시: N: 4 17
 *   1. 4 에 의해 (5, 1), (3, 1), (8, 0) 이 저장됨
 *   2. 8 에 의해 2배씩 큰 수들이 저장됨.
 *   3. 5 에 의해 (6, 2) 가 추가로 저장됨
 *   4. 3 에 의해 (6, 0) 이 저장됨
 *   -> 6이 2번 저장됨
 */
const visitQueue = new PriorityQueue(400001, cmp)
visitQueue.push({now: N, seconds: 0})

// BFS 연산을 수행한다. 다익스트라로 봐도 크게 상관 없어보인다.
while (visitQueue.size() > 0) {
  const {now, seconds} = visitQueue.pop()

  if (seconds > isVisit[now]) {
    continue
  }

  if (now > 0) {
    const next = now - 1
    if (isVisit[next] > seconds + 1) {
      isVisit[next] = seconds + 1
      visitQueue.push({now: next, seconds: seconds + 1})
    }
  }
  if (now < 200000) {
    const next = now + 1
    if (isVisit[next] > seconds + 1) {
      isVisit[next] = seconds + 1
      visitQueue.push({now: next, seconds: seconds + 1})
    }
  }
  if (now < 100000 && now > 0) {
    const next = now * 2
    if (isVisit[next] > seconds) {
      isVisit[next] = seconds
      visitQueue.push({now: next, seconds: seconds})
    }
  }
}

// 출력
process.stdout.write(`${isVisit[K]}`)
