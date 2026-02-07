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
let remain = 0
const T = +inputArr[0]
const queryArr = inputArr
  .slice(1)
  .map((inputRow, rowIdx) => {
    if (remain === 0) {
      const [n, m, t] = inputArr[rowIdx + 1].trim().split(' ').map(Number)
      const [s, g, h] = inputArr[rowIdx + 2].trim().split(' ').map(Number)
      const abdArr = inputArr.slice(rowIdx + 3, rowIdx + 3 + m).map(row => row.trim().split(' ').map(Number))
      const xArr = inputArr.slice(rowIdx + 3 + m, rowIdx + 3 + m + t).map(Number)

      remain = m + t + 1

      return [[n, m, t], [s, g, h], abdArr, xArr]
    } // ::
    else {
      remain--
      return null
    }
  })
  .filter(block => block !== null)

queryArr.forEach(query => {
  const [n, m, t] = query[0]
  const [s, g, h] = query[1]
  const abdArr = query[2]
  const xArr = query[3]

  const connectListArr = Array.from({length: n + 1}, () => [])

  abdArr.forEach(abd => {
    const [a, b, d] = abd
    connectListArr[a].push([b, d])
    connectListArr[b].push([a, d])
  })

  /**
   * distArr[i] : s 부터 i 까지 최단거리
   * isVisitGH[i] : s 부터 i 까지 최단거리로 이동했을때, 간선 g-h 를 지났는지 여부
   * visitQueue : 우선순위큐로 선언되는 다익스트라용 방문큐
   */
  const distArr = Array.from({length: n + 1}).fill(3000000)
  const isVisitGH = Array.from({length: n + 1}).fill(false)
  const visitQueue = new PriorityQueue(n + m + 1, cmp)

  distArr[s] = 0
  visitQueue.push({now: s, dist: 0, isVisit: false})

  while (visitQueue.size() > 0) {
    const {now, dist, isVisit} = visitQueue.pop()

    // - 이미 더 짧은 최단거리를 구했거나
    // - 최단거리는 같지만 g-h 를 지나는 최단거리를 이미 구했거나
    if (dist > distArr[now] || (dist === distArr[now] && !isVisit && isVisitGH[now])) {
      continue
    }

    connectListArr[now].forEach(connInfo => {
      const [next, delta] = connInfo
      const newDist = dist + delta
      const newVisit = isVisit || (now === g && next === h) || (now === h && next === g)

      if (distArr[next] > newDist || (distArr[next] === newDist && !isVisitGH[next] && newVisit)) {
        distArr[next] = newDist
        isVisitGH[next] = newVisit
        visitQueue.push({now: next, dist: newDist, isVisit: newVisit})
      }
    })
  }

  // 결과 추려내기
  const resultArr = xArr.filter(x => isVisitGH[x])
  resultArr.sort((a, b) => a - b)

  process.stdout.write(`${resultArr.join(' ')}\n`)
})
