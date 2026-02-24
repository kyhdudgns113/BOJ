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

// 사용할 자료구조들
const unionArr = new Array(200000)
const numMemArr = new Array(200000)
const weightArr = new Array(200000)
const edgePQ = new PriorityQueue(200001, cmpFunction)

// 입력 파싱
let remain = 0
inputArr.forEach((_, inputIdx) => {
  if (remain === 0) {
    const [M, N] = inputArr[inputIdx].trim().split(' ').map(Number)
    const roadInfoArr = inputArr.slice(inputIdx + 1, inputIdx + 1 + N).map(row => row.trim().split(' ').map(Number))

    // 종료조건
    if (M === 0) {
      return
    }

    // 자료구조 초기화
    for (let i = 0; i < 200000; i++) {
      unionArr[i] = i
      numMemArr[i] = 1
      weightArr[i] = 0
    }
    edgePQ.resetQueue()

    // 기존에 설치된 길들의 합
    let totalLen = 0

    // 도로 정보를 우선순위큐에 넣는다.
    roadInfoArr.forEach(info => {
      const [A, B, dist] = info
      edgePQ.push([A, B, dist])

      // 총 길이도 증가한다.
      totalLen += dist
    })

    // 우선순위 큐를 돌면서 최소신장트리를 완성한다.
    while (edgePQ.size() > 0) {
      const [A, B, weight] = edgePQ.pop()

      if (!isSameUnion(A, B)) {
        const [numMem, resultW] = joinUnion(A, B, weight)

        if (numMem === M) {
          process.stdout.write(`${totalLen - resultW}\n`)
          break
        }
      }
    }

    remain = N
  } // ::
  else {
    remain--
  }
})

function cmpFunction(a, b) {
  if (a[2] < b[2]) return true
  else return false
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
    weightArr[smallUnion] += weightArr[bigUnion] + weight
  }

  return [numMemArr[smallUnion], weightArr[smallUnion]]
}
