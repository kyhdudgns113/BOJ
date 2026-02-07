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
  if (a < b) return true
  else return false
}

// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].trim().split(' ').map(Number)
const ABArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 나보다 늦게 풀어야 되는 문제들의 목록을 저장
// Key 들을 나중에 자동정렬을 하기위해 Set 이 아닌 {} 사용
const mapArr = Array.from({length: N + 1}, () => {
  return {}
})

// 나보다 먼저 풀어야 되는 문제중 남은 문제의 수 저장
const remainArr = Array.from({length: N + 1}).fill(0)

// mapArr, remainArr 에 값 저장
ABArr.forEach(AB => {
  const [A, B] = AB
  mapArr[A][B] = 1
  remainArr[B]++
})

// 방문큐. 쉬운 문제부터 풀어야 하기에 PriorityQueue 로 선언
const visitQueue = new PriorityQueue(N, cmp)

for (let i = 1; i <= N; i++) {
  if (remainArr[i] === 0) {
    visitQueue.push(i)
  }
}

// 출력 변수
let resultStr = ''

while (visitQueue.size() > 0) {
  const now = visitQueue.pop()

  Object.keys(mapArr[now]).forEach(next => {
    const nextNum = +next
    remainArr[nextNum]--

    if (remainArr[nextNum] === 0) {
      visitQueue.push(nextNum)
    }
  })

  resultStr += now + ' '
}

process.stdout.write(resultStr)
