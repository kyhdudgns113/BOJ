// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const T = +inputArr[0]
const queryArr = inputArr.slice(1).map(inputRow => inputRow.trim().split(' ').map(Number))

// 재사용할 배열 (테스트 케이스마다 초기화)
const resultArr = new Array(10001)
const prevNum = new Array(10001)
const prevOp = new Array(10001)
const visitQueue = new Array(10001)

// 쿼리마다 연산 수행
queryArr.forEach(query => {
  const [start, end] = query

  // 초기화 (배열 재사용으로 할당 최소화)
  resultArr.fill(20000)
  prevNum.fill(-1)
  prevOp.fill('X')
  resultArr[start] = 0

  let nowIdx = 0
  let insertIdx = 0
  visitQueue[insertIdx++] = start

  // BFS 연산
  while (nowIdx < insertIdx) {
    const now = visitQueue[nowIdx++]
    const nowRes = resultArr[now]

    if (now === end) break

    const nowD = (2 * now) % 10000
    const nowS = (now + 9999) % 10000
    const nowL = (now % 1000) * 10 + (now / 1000) | 0
    const nowR = (now % 10) * 1000 + (now / 10) | 0

    // D 연산
    if (resultArr[nowD] > nowRes + 1) {
      resultArr[nowD] = nowRes + 1
      prevNum[nowD] = now
      prevOp[nowD] = 'D'
      visitQueue[insertIdx++] = nowD
    }

    // S 연산
    if (resultArr[nowS] > nowRes + 1) {
      resultArr[nowS] = nowRes + 1
      prevNum[nowS] = now
      prevOp[nowS] = 'S'
      visitQueue[insertIdx++] = nowS
    }

    // L 연산
    if (resultArr[nowL] > nowRes + 1) {
      resultArr[nowL] = nowRes + 1
      prevNum[nowL] = now
      prevOp[nowL] = 'L'
      visitQueue[insertIdx++] = nowL
    }

    // R 연산
    if (resultArr[nowR] > nowRes + 1) {
      resultArr[nowR] = nowRes + 1
      prevNum[nowR] = now
      prevOp[nowR] = 'R'
      visitQueue[insertIdx++] = nowR
    }
  }

  // 출력할 배열. 역순으로 넣는다.
  const printArr = []
  let now = end

  while (now !== start) {
    printArr.push(prevOp[now])
    now = prevNum[now]
  }

  // 배열을 뒤집어서 출력
  process.stdout.write(printArr.reverse().join('') + '\n')
})
