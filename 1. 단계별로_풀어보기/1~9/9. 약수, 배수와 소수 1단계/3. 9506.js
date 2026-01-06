class ListElem {
  constructor(value, prev, next) {
    this.value = value
    this.prev = prev
    this.next = next
  }

  getNext() {
    return this.next
  }
  getPrev() {
    return this.prev
  }
  getValue() {
    return this.value
  }

  setNext(next) {
    this.next = next
  }
  setPrev(prev) {
    this.prev = prev
  }
}

// 필요한 기능만 대충 짰다.
class List {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  pushHead(value) {
    const elem = new ListElem(value, null, this.head)
    this.head?.setPrev(elem)
    this.head = elem

    if (this.length === 0) {
      this.tail = elem
    }

    this.length += 1
  }
  pushTail(value) {
    const elem = new ListElem(value, this.tail, null)
    this.tail?.setNext(elem)
    this.tail = elem

    if (this.length === 0) {
      this.head = elem
    }

    this.length += 1
  }

  getHead() {
    return this.head
  }
  getTail() {
    return this.tail
  }
}

const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

inputArr.forEach(inputStr => {
  // 정수로 변환
  const N = +inputStr.trim()

  // 종료 조건
  if (N === -1) {
    return
  }

  // 약수들을 더할 변수
  let sumNums = 0

  // 약수들을 저장할 리스트
  const ascList = new List()
  const descList = new List()

  const maxIter = Math.floor(Math.sqrt(N))

  // 약수들을 구한다.
  for (let i = 1; i <= maxIter; i++) {
    if (N % i === 0) {
      sumNums += i
      ascList.pushTail(i)

      const div = N / i

      if (div !== N && div !== i) {
        sumNums += div
        descList.pushHead(div)
      }
    }
  }

  let result = `${N} `
  // 완전수인 경우
  if (sumNums === N) {
    // 리스트를 합친다.
    let iter = descList.getHead()

    while (iter !== null) {
      const value = iter.getValue()
      ascList.pushTail(value)
      iter = iter.getNext()
    }

    // 리스트 앞 원소부터 넣는다.
    result += '= '
    iter = ascList.getHead()

    while (iter !== null) {
      const value = iter.getValue()
      result += `${value} `

      if (iter.getNext() !== null) {
        result += '+ '
      }

      iter = iter.getNext()
    }
    result += '\n'

    process.stdout.write(result)
  } else {
    // 완전수 아닌 경우
    process.stdout.write(`${N} is NOT perfect.\n`)
  }
})
