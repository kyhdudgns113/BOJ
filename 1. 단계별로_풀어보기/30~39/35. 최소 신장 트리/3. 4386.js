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
      this.heapArr.push(val)
      this.heapLen++
      this.maxLen++
    } // ::
    else {
      this.heapArr[this.heapLen++] = val
    }

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

  /**
   * 다른 테스트 케이스에 대해 우선순위큐를 사용할때를 위해 작성
   * 테스트 케이스마다 우선순위큐를 선언하면 메모리 초과가 발생할 수 있음
   */
  resetQueue() {
    this.heapArr.fill(null)
    this.heapLen = 0
  }

  size() {
    return this.heapLen
  }
  // END OF PQ
}

function cmpFunction(a, b) {
  if (a[2] < b[2]) return true
  else return false
}

// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const axisArr = inputArr.slice(1).map(row => row.trim().split(' ').map(parseFloat))

const unionArr = Array.from({length: N})
  .fill(null)
  .map((_, idx) => idx)
const numMemArr = Array.from({length: N}).fill(1)
const costArr = Array.from({length: N}).fill(parseFloat('0'))

const edgePQ = new PriorityQueue(10001, cmpFunction)

// 우선순위큐에 두 점 사이의 거리 정보 입력
for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    if (i !== j) {
      edgePQ.push([i, j, dist(i, j)])
    }
  }
}

// 최소 신장 트리 생성
while (edgePQ.size() > 0) {
  const [idxA, idxB, dist] = edgePQ.pop()

  if (!isSameUnion(idxA, idxB)) {
    const [numMem, sumCost] = joinUnion(idxA, idxB, dist)

    if (numMem === N) {
      process.stdout.write(`${sumCost}`)
      break
    }
  }
}

function findRoot(now) {
  if (unionArr[now] === now) {
    return now
  }

  unionArr[now] = findRoot(unionArr[now])
  return unionArr[now]
}

function isSameUnion(a, b) {
  return findRoot(a) === findRoot(b)
}

function joinUnion(a, b, cost) {
  const smaller = Math.min(a, b)
  const bigger = Math.max(a, b)

  const smallRoot = findRoot(smaller)
  const bigRoot = findRoot(bigger)

  if (smallRoot !== bigRoot) {
    unionArr[bigRoot] = smallRoot
    numMemArr[smallRoot] += numMemArr[bigRoot]
    costArr[smallRoot] += costArr[bigRoot] + cost
  }

  return [numMemArr[smallRoot], costArr[smallRoot]]
}

function dist(idxA, idxB) {
  const A = axisArr[idxA]
  const B = axisArr[idxB]

  return Math.sqrt(Math.pow(A[0] - B[0], 2) + Math.pow(A[1] - B[1], 2))
}
