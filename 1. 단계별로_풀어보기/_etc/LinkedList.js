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
