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

// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].trim().split(' ').map(Number)
const axisArr = inputArr.slice(1, N + 1).map(row => row.trim().split(' ').map(Number))
const alreadyArr = inputArr.slice(N + 1).map(row => row.trim().split(' ').map(Number))

const unionArr = Array.from({length: N + 1})
  .fill(null)
  .map((_, idx) => idx)
const numMemArr = Array.from({length: N + 1}).fill(1)
const weightArr = Array.from({length: N + 1}).fill(0.0)
const edgePQ = new PriorityQueue(N * N + 1, cmpFunction)

// 우선순위큐에 우주신들끼리의 거리정보를 넣는다.
for (let i = 1; i <= N; i++) {
  for (let j = i + 1; j <= N; j++) {
    edgePQ.push([i, j, dist(i, j)])
  }
}

// 이미 연결이 된 우주신들을 결합한다.
alreadyArr.forEach(ab => {
  const [a, b] = ab

  joinUnion(a, b, 0)
})

// 우선순위큐를 돌며 가까운 우주신들부터 연결한다.
while (edgePQ.size() > 0) {
  const [a, b, dists] = edgePQ.pop()

  if (!isSameUnion(a, b)) {
    const [numMem, weight] = joinUnion(a, b, dists)

    if (numMem === N) {
      process.stdout.write(`${weight.toFixed(2)}`)
      break
    }
  }
}

function cmpFunction(a, b) {
  if (a[2] < b[2]) return true
  else return false
}

function dist(idxA, idxB) {
  const A = axisArr[idxA - 1]
  const B = axisArr[idxB - 1]

  return Math.sqrt(Math.pow(A[0] - B[0], 2) + Math.pow(A[1] - B[1], 2))
}

function findUnion(now) {
  if (unionArr[now] === now) {
    return now
  }

  unionArr[now] = findUnion(unionArr[now])
  return unionArr[now]
}

function isSameUnion(a, b) {
  return findUnion(a) === findUnion(b)
}

function joinUnion(a, b, weight) {
  const small = Math.min(a, b)
  const big = Math.max(a, b)

  const smallUnion = findUnion(small)
  const bigUnion = findUnion(big)

  if (smallUnion !== bigUnion) {
    unionArr[bigUnion] = smallUnion
    numMemArr[smallUnion] += numMemArr[bigUnion]
    if (weight > 0) {
      weightArr[smallUnion] += weightArr[bigUnion] + weight
    }
  }

  return [numMemArr[smallUnion], weightArr[smallUnion]]
}
