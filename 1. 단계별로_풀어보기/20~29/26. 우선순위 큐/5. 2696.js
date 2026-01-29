// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const T = +inputArr[0]
let isM = 0
const queryArr = inputArr
  .slice(1)
  .map((row, rowIdx) => {
    if (isM === 0) {
      const M = +row
      const numLines = Math.floor((M + 9) / 10)
      isM = numLines
      const numArr = inputArr
        .slice(rowIdx + 2, rowIdx + 3 + numLines)
        .map(row2 => row2.trim().split(' ').map(Number))
        .flat()
      return [M, numArr]
    } // ::
    else {
      isM--
      return null
    }
  })
  .filter(block => block !== null)

// 우선순위 큐 클래스
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

// 출력 변수
let resultStr = ''

queryArr.forEach(query => {
  const [M, numArr] = query

  // 작은 숫자들이 들어갈 우선순위 큐, 그중에서 큰 수가 먼저 나오도록 한다.
  const smallQ = new PriorityQueue(10000, cmpDESC)

  // 큰 숫자들이 들어갈 우선순위 큐, 그중에서 작은수가 먼저 나오도록 한다
  const bigQ = new PriorityQueue(10000, cmpASC)

  resultStr += Math.floor((M + 1) / 2) + '\n'
  let cntNum = 0 // 개행을 추가할지 결정하는 변수

  numArr.forEach((num, numIdx) => {
    if (numIdx === 0) {
      // 처음 숫자는 일단 smallQ 에 넣는다.
      smallQ.push(num)
      resultStr += num + ' '
      cntNum++
    } // ::
    else if (numIdx === 1) {
      const prevVal = smallQ.pop()
      if (prevVal < num) {
        smallQ.push(prevVal)
        bigQ.push(num)
      } // ::
      else {
        smallQ.push(num)
        bigQ.push(prevVal)
      }
    } // ::
    else {
      let smallVal = smallQ.pop()
      let bigVal = bigQ.pop()
      let midVal = num

      if (num <= smallVal) {
        // num 이 가장 작은 경우
        midVal = smallVal
        smallVal = num
      } // ::
      else if (bigVal <= num) {
        // num 이 가장 큰 경우
        midVal = bigVal
        bigVal = num
      }

      smallQ.push(smallVal)
      bigQ.push(bigVal)

      if (smallQ.size() === bigQ.size()) {
        // 큐의 크기가 같다면 일단 smallQ 에 넣는다.
        smallQ.push(midVal)

        // 개행이 필요한지 체크한다
        if (cntNum % 10 === 0) {
          resultStr += '\n'
        }
        // 현재 큐의 크기가 같다는건 지금까지의 숫자가 홀수개라는 뜻이다.
        resultStr += midVal + ' '
        cntNum++
      } // ::
      else {
        bigQ.push(midVal)
      }
    }
  })

  resultStr += '\n'
})

// 출력
process.stdout.write(resultStr)

function cmpASC(a, b) {
  if (a < b) return true
  else return false
}

function cmpDESC(a, b) {
  if (a > b) return true
  else return false
}
