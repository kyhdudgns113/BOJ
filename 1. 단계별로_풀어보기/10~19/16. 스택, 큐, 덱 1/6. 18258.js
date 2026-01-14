// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const queryArr = inputArr.slice(1).map(row => row.trim().split(' '))

// 큐 역할을 할 배열 선언
const queue = Array.from({length: 2000000}).fill(0)
let headIdx = 0
let tailIdx = -1

// 출력할 결과 변수
let result = ''

queryArr.forEach(query => {
  const order = query[0]
  const isEmpty = headIdx > tailIdx

  if (order === 'push') {
    const X = +query[1]

    queue[++tailIdx] = X
  } // ::
  else if (order === 'pop') {
    if (isEmpty) {
      result += '-1\n'
    } // ::
    else {
      result += queue[headIdx++] + '\n'
    }
  } // ::
  else if (order === 'size') {
    const sizes = tailIdx - headIdx + 1
    result += sizes + '\n'
  } // ::
  else if (order === 'empty') {
    result += (isEmpty ? 1 : 0) + '\n'
  } // ::
  else if (order === 'front') {
    if (isEmpty) {
      result += '-1\n'
    } // ::
    else {
      result += queue[headIdx] + '\n'
    }
  } // ::
  else {
    if (isEmpty) {
      result += '-1\n'
    } // ::
    else {
      result += queue[tailIdx] + '\n'
    }
  }
})

// 출력
process.stdout.write(result)
