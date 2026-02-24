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
const [V, E] = inputArr[0].trim().split(' ').map(Number)
const connInfoArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

const edgePQ = new PriorityQueue(100001, cmpFunction)
const unionArr = Array.from({length: V + 1})
  .fill(null)
  .map((_, idx) => idx)
const numMemArr = Array.from({length: V + 1}).fill(1)
const weightArr = Array.from({length: V + 1}).fill(0)

connInfoArr.forEach(info => edgePQ.push(info))

while (edgePQ.size() > 0) {
  const [A, B, weight] = edgePQ.pop()

  if (!isSameUnion(A, B)) {
    const [numMem, sumWeight] = joinUnion(A, B, weight)

    if (numMem === V) {
      process.stdout.write(`${sumWeight}`)
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

function joinUnion(a, b, weight) {
  const smaller = Math.min(a, b)
  const bigger = Math.max(a, b)

  const smallRoot = findRoot(smaller)
  const bigRoot = findRoot(bigger)

  if (smallRoot !== bigRoot) {
    unionArr[bigRoot] = smallRoot
    numMemArr[smallRoot] += numMemArr[bigRoot]
    weightArr[smallRoot] += weightArr[bigRoot] + weight
  }

  return [numMemArr[smallRoot], weightArr[smallRoot]]
}
