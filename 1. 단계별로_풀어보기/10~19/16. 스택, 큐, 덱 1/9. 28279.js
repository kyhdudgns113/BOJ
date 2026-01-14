// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const queryArr = inputArr.slice(1).map(str => str.split(' ').map(Number))

// 출력 결과 변수
let resultStr = ''

// 큐 역할을 할 배열
const deque = Array.from({length: 2000001}).fill(0)
let headIdx = 1000000
let tailIdx = 999999

// 연산
queryArr.forEach(query => {
  const order = query[0]

  const isEmpty = headIdx > tailIdx

  if (order === 1) {
    const X = query[1]
    deque[--headIdx] = X
  } // ::
  else if (order === 2) {
    const X = query[1]
    deque[++tailIdx] = X
  } // ::
  else if (order === 3) {
    if (isEmpty) {
      resultStr += '-1\n'
    } // ::
    else {
      resultStr += `${deque[headIdx++]}\n`
    }
  } // ::
  else if (order === 4) {
    if (isEmpty) {
      resultStr += '-1\n'
    } // ::
    else {
      resultStr += `${deque[tailIdx--]}\n`
    }
  } // ::
  else if (order === 5) {
    resultStr += `${tailIdx - headIdx + 1}\n`
  } // ::
  else if (order === 6) {
    resultStr += `${isEmpty ? 1 : 0}\n`
  } // ::
  else if (order === 7) {
    if (isEmpty) {
      resultStr += '-1\n'
    } // ::
    else {
      resultStr += `${deque[headIdx]}\n`
    }
  } // :;
  else {
    if (isEmpty) {
      resultStr += '-1\n'
    } // ::
    else {
      resultStr += `${deque[tailIdx]}\n`
    }
  }
})

process.stdout.write(resultStr)
