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
const inputArr = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map(row => row.trim())

// 입력 파싱
const [N, M] = inputArr[0].split(' ').map(Number)
const mapMatrix = inputArr.slice(1).map(row => row.split(' ').map(Number))

const edgePQ = new PriorityQueue(N * M, cmpFunction)
const numIsland = Array.from({length: N}, () => Array.from({length: M}).fill(0))
const numMemArr = Array.from({length: N * M}).fill(1)
const unionArr = Array.from({length: N * M})
  .fill(null)
  .map((_, idx) => idx)
const weightArr = Array.from({length: N * M}).fill(0)

// 섬 구성
let cnt = 0
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (mapMatrix[i][j] === 1 && numIsland[i][j] === 0) {
      DFS(i, j, ++cnt)
    }
  }
}

// 각 행마다 가로로 이동
for (let row = 0; row < N; row++) {
  let lenBridge = 0
  let nowIsland = 0

  for (let col = 0; col < M; col++) {
    const here = mapMatrix[row][col]

    if (here === 0) {
      lenBridge++
    } // ::
    else {
      if (nowIsland !== numIsland[row][col]) {
        if (nowIsland !== 0 && numIsland[row][col] !== 0 && lenBridge >= 2) {
          edgePQ.push([nowIsland, numIsland[row][col], lenBridge])
        }
        nowIsland = numIsland[row][col]
      }
      lenBridge = 0
    }
  }
}

// 각 열마다 세로로 이동
for (let col = 0; col < M; col++) {
  let lenBridge = 0
  let nowIsland = 0

  for (let row = 0; row < N; row++) {
    const here = mapMatrix[row][col]

    if (here === 0) {
      lenBridge++
    } // ::
    else {
      if (nowIsland !== numIsland[row][col]) {
        if (nowIsland !== 0 && numIsland[row][col] !== 0 && lenBridge >= 2) {
          edgePQ.push([nowIsland, numIsland[row][col], lenBridge])
        }
        nowIsland = numIsland[row][col]
      }
      lenBridge = 0
    }
  }
}

// 최소신장트리 구성
let isPossible = false
while (edgePQ.size() > 0) {
  const [a, b, w] = edgePQ.pop()

  if (!isSameUnion(a, b)) {
    const [numMem, resultW] = joinUnion(a, b, w)

    if (numMem === cnt) {
      process.stdout.write(`${resultW}`)
      isPossible = true
      break
    }
  }
}

if (!isPossible) {
  process.stdout.write('-1')
}

function cmpFunction(a, b) {
  if (a[2] < b[2]) return true
  else return false
}

function DFS(row, col, team) {
  numIsland[row][col] = team

  const nextRowArr = [row - 1, row + 1, row, row]
  const nextColArr = [col, col, col - 1, col + 1]

  for (let i = 0; i < 4; i++) {
    const nextRow = nextRowArr[i]
    const nextCol = nextColArr[i]

    if (0 <= nextRow && nextRow < N && 0 <= nextCol && nextCol < M) {
      if (mapMatrix[nextRow][nextCol] === 1 && numIsland[nextRow][nextCol] === 0) {
        DFS(nextRow, nextCol, team)
      }
    }
  }
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

function joinUnion(a, b, w) {
  const c = Math.min(a, b)
  const d = Math.max(a, b)

  cUnion = findUnion(c)
  dUnion = findUnion(d)

  if (cUnion !== dUnion) {
    unionArr[dUnion] = cUnion
    numMemArr[cUnion] += numMemArr[dUnion]
    weightArr[cUnion] += weightArr[dUnion] + w
  }

  return [numMemArr[cUnion], weightArr[cUnion]]
}
