// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const queryArr = inputArr.slice(1).map(row => row.split(' ').map(Number))

// 링크드 리스트 클래스 선언
class Node {
  constructor(data) {
    this.data = data
    this.next = null
    this.prev = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  pushFront(data) {
    const newNode = new Node(data)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } // ::
    else {
      newNode.next = this.head
      this.head.prev = newNode
      this.head = newNode
    }
    this.length++
    return this
  }

  pushBack(data) {
    const newNode = new Node(data)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } // ::
    else {
      newNode.prev = this.tail
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length++
    return this
  }

  popFront() {
    if (!this.head) {
      return null
    }

    const deletedNode = this.head
    this.head = this.head.next

    if (!this.head) {
      this.tail = null
    } // ::
    else {
      this.head.prev = null
    }

    this.length--
    return deletedNode.data
  }

  popBack() {
    if (!this.head) {
      return null
    }

    const deletedNode = this.tail
    this.tail = this.tail.prev

    if (!this.tail) {
      this.head = null
    } // ::
    else {
      this.tail.next = null
    }

    this.length--
    return deletedNode.data
  }

  getFront() {
    if (!this.head) {
      return null
    }
    return this.head.data
  }

  getBack() {
    if (!this.tail) {
      return null
    }
    return this.tail.data
  }
}

const stack = new LinkedList()
let resultStr = ''

queryArr.forEach(query => {
  const order = query[0]

  switch (order) {
    case 1:
      const X = query[1]
      stack.pushBack(X)
      break
    case 2:
      const xBack = stack.popBack()
      if (xBack !== null) resultStr += `${xBack}\n`
      else resultStr += `-1\n`
      break
    case 3:
      resultStr += `${stack.length}\n`
      break
    case 4:
      if (stack.length === 0) resultStr += `1\n`
      else resultStr += '0\n'
      break
    case 5:
      const xLast = stack.getBack()
      if (xLast !== null) resultStr += `${xLast}\n`
      else resultStr += `-1\n`
  }
})

process.stdout.write(resultStr)
