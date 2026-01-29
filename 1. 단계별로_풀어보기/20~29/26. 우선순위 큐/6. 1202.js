// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, K] = inputArr[0].trim().split(' ').map(Number)
const jewelArr = inputArr.slice(1, N + 1).map(row => row.trim().split(' ').map(Number))
const bagArr = inputArr.slice(N + 1).map(Number)

class RBTNode {
  constructor(val, parent = null, isRed = true) {
    this.value = val
    this.parent = parent // 부모 노드
    this.lchild = null // 왼쪽 자식 노드
    this.rchild = null // 오른쪽 자식 노드
    this.numNodes = 1 // 본인 및 자손 노드들의 갯수
    this.isRed = isRed // true: 빨간색, false: 검은색
  }

  getNumLefts() {
    if (this.lchild) {
      return this.lchild.getNumNodes()
    } // ::
    else {
      return 0
    }
  }
  getNumNodes() {
    return this.numNodes
  }
  getNumRights() {
    if (this.rchild) {
      return this.rchild.getNumNodes()
    } // ::
    else {
      return 0
    }
  }
  getValue() {
    return this.value
  }
}

class RBT {
  // cmp: a 가 b 보다 앞에 있어야만 한다면 true, 같거나 뒤에 있어도 되면 false
  cmp = (a, b) => {
    return a < b
  }

  constructor(cmp = null) {
    if (cmp !== null) {
      this.cmp = cmp
    }
    // 루트노드
    this.root = null
    // RBT 의 원소의 갯수
    this.length = 0
  }

  // 인덱스가 idx 인 원소를 지운다.
  delete(idx) {
    if (idx < 0 || idx >= this.length) {
      return null
    }

    const node = this._getNodeByIndex(idx)
    if (!node) {
      return null
    }

    this._deleteNode(node)
    this.length--
    return node.value
  }

  deleteNode(node) {
    this._deleteNode(node)
    this.length--
    return node
  }

  // val보다 크거나 같은 값 중 가장 작은 값의 노드를 찾는다.
  findNodeGreaterOrEqual(val) {
    if (this.root === null) {
      return null
    }

    let current = this.root
    let result = null

    while (current !== null) {
      if (this.cmp(val, current.value)) {
        // val < current.value: current가 후보가 될 수 있음
        result = current
        current = current.lchild
      } // ::
      else if (this.cmp(current.value, val)) {
        // current.value < val: 오른쪽으로 이동
        current = current.rchild
      } // ::
      else {
        // val === current.value: 정확히 일치
        return current
      }
    }

    return result
  }

  // val보다 큰 값 중 가장 작은 값의 노드를 찾는다.
  findNodeGreaterThan(val) {
    if (this.root === null) {
      return null
    }

    let current = this.root
    let result = null

    while (current !== null) {
      if (this.cmp(val, current.value)) {
        // val < current.value: current가 후보가 될 수 있음
        result = current
        current = current.lchild
      } // ::
      else {
        // val >= current.value: 오른쪽으로 이동
        current = current.rchild
      }
    }

    return result
  }

  // val보다 작거나 같은 값 중 가장 큰 값의 노드를 찾는다.
  findNodeLessOrEqual(val) {
    if (this.root === null) {
      return null
    }

    let current = this.root
    let result = null

    while (current !== null) {
      if (this.cmp(current.value, val)) {
        // current.value < val: current가 후보가 될 수 있음
        result = current
        current = current.rchild
      } // ::
      else if (this.cmp(val, current.value)) {
        // val < current.value: 왼쪽으로 이동
        current = current.lchild
      } // ::
      else {
        // val === current.value: 정확히 일치
        return current
      }
    }

    return result
  }

  // val보다 작은 값 중 가장 큰 값의 노드를 찾는다.
  findNodeLessThan(val) {
    if (this.root === null) {
      return null
    }

    let current = this.root
    let result = null

    while (current !== null) {
      if (this.cmp(current.value, val)) {
        // current.value < val: current가 후보가 될 수 있음
        result = current
        current = current.rchild
      } // ::
      else {
        // val <= current.value: 왼쪽으로 이동
        current = current.lchild
      }
    }

    return result
  }

  // idx 번째 Node 의 value 를 얻는다.
  get(idx) {
    const node = this._getNodeByIndex(idx)
    return node ? node.value : null
  }

  // RBT 에 val 값을 가진 RBTNode 를 넣는다.
  insert(val) {
    const newNode = new RBTNode(val, null, true)

    if (this.root === null) {
      this.root = newNode
      newNode.isRed = false // 루트는 검은색
      this.length++
      return
    }

    // BST 삽입
    let current = this.root
    while (true) {
      current.numNodes++ // 경로상의 모든 노드의 numNodes 증가

      if (this.cmp(val, current.value)) {
        if (current.lchild === null) {
          current.lchild = newNode
          newNode.parent = current
          break
        }
        current = current.lchild
      } // ::
      else {
        if (current.rchild === null) {
          current.rchild = newNode
          newNode.parent = current
          break
        }
        current = current.rchild
      }
    }

    // RBT 속성 복구
    this._fixInsert(newNode)
    this.length++
  }

  // idx번째 노드를 찾는다 (0-based)
  _getNodeByIndex(idx) {
    if (idx < 0 || idx >= this.length || this.root === null) {
      return null
    }

    let current = this.root
    let currentIdx = current.getNumLefts()

    while (currentIdx !== idx) {
      if (idx < currentIdx) {
        current = current.lchild
        if (current === null) break
        currentIdx -= current.getNumRights() + 1
      } // ::
      else {
        current = current.rchild
        if (current === null) break
        currentIdx += current.getNumLefts() + 1
      }
    }

    return current
  }

  // 노드 삭제 (BST 삭제 + RBT 속성 복구)
  _deleteNode(node) {
    // 자식이 2개인 경우: 후계자 노드로 교체
    if (node.lchild !== null && node.rchild !== null) {
      const successor = this._findMin(node.rchild)
      node.value = successor.value
      node = successor // 실제로 삭제할 노드를 후계자로 변경
    }

    // 삭제할 노드의 자식 (0개 또는 1개)
    const child = node.lchild !== null ? node.lchild : node.rchild
    const isDeletedRed = node.isRed

    // 부모의 numNodes 감소
    this._decreaseNumNodes(node)

    if (node.parent === null) {
      // 루트 삭제
      this.root = child
      if (child !== null) {
        child.parent = null
        child.isRed = false
      }
    } // ::
    else {
      // 부모와 연결
      if (node === node.parent.lchild) {
        node.parent.lchild = child
      } // ::
      else {
        node.parent.rchild = child
      }

      if (child !== null) {
        child.parent = node.parent
      }

      // 검은 노드 삭제 시 RBT 속성 복구 필요
      if (!isDeletedRed) {
        if (child !== null && child.isRed) {
          child.isRed = false
        } // ::
        else {
          this._fixDelete(child, node.parent)
        }
      }
    }
  }

  // 노드의 모든 조상의 numNodes를 1 감소
  _decreaseNumNodes(node) {
    let current = node.parent
    while (current !== null) {
      current.numNodes--
      current = current.parent
    }
  }

  // 서브트리의 최솟값 노드 찾기
  _findMin(node) {
    while (node.lchild !== null) {
      node = node.lchild
    }
    return node
  }

  // 삽입 후 RBT 속성 복구
  _fixInsert(node) {
    while (node !== this.root && node.parent.isRed) {
      const parent = node.parent
      const grandparent = parent.parent

      if (parent === grandparent.lchild) {
        const uncle = grandparent.rchild

        // Case 1: 삼촌이 빨간색
        if (uncle !== null && uncle.isRed) {
          parent.isRed = false
          uncle.isRed = false
          grandparent.isRed = true
          node = grandparent
        } // ::
        else {
          // Case 2: 삼촌이 검은색이고 node가 오른쪽 자식
          if (node === parent.rchild) {
            node = parent
            this._rotateLeft(node)
          }
          // Case 3: 삼촌이 검은색이고 node가 왼쪽 자식
          node.parent.isRed = false
          node.parent.parent.isRed = true
          this._rotateRight(node.parent.parent)
        }
      } // ::
      else {
        // 부모가 오른쪽 자식인 경우 (대칭)
        const uncle = grandparent.lchild

        if (uncle !== null && uncle.isRed) {
          parent.isRed = false
          uncle.isRed = false
          grandparent.isRed = true
          node = grandparent
        } // ::
        else {
          if (node === parent.lchild) {
            node = parent
            this._rotateRight(node)
          }
          node.parent.isRed = false
          node.parent.parent.isRed = true
          this._rotateLeft(node.parent.parent)
        }
      }
    }

    // 루트는 항상 검은색
    this.root.isRed = false
  }

  // 삭제 후 RBT 속성 복구
  _fixDelete(node, parent) {
    while (node !== this.root && (node === null || !node.isRed)) {
      if (parent === null) break
      if (node === parent.lchild) {
        let sibling = parent.rchild

        // Case 1: 형제가 빨간색
        if (sibling !== null && sibling.isRed) {
          sibling.isRed = false
          parent.isRed = true
          this._rotateLeft(parent)
          sibling = parent.rchild
        }

        // Case 2: 형제가 검은색이고 형제의 두 자식도 검은색
        if (
          (sibling === null || !sibling.isRed) &&
          (sibling === null || sibling.lchild === null || !sibling.lchild.isRed) &&
          (sibling === null || sibling.rchild === null || !sibling.rchild.isRed)
        ) {
          if (sibling !== null) {
            sibling.isRed = true
          }
          node = parent
          parent = node.parent
        } // ::
        else {
          // Case 3: 형제의 오른쪽 자식이 검은색
          if (sibling === null || sibling.rchild === null || !sibling.rchild.isRed) {
            if (sibling !== null && sibling.lchild !== null) {
              sibling.lchild.isRed = false
            }
            if (sibling !== null) {
              sibling.isRed = true
            }
            if (sibling !== null) {
              this._rotateRight(sibling)
            }
            sibling = parent.rchild
          }

          // Case 4: 형제의 오른쪽 자식이 빨간색
          if (sibling !== null) {
            sibling.isRed = parent.isRed
          }
          parent.isRed = false
          if (sibling !== null && sibling.rchild !== null) {
            sibling.rchild.isRed = false
          }
          this._rotateLeft(parent)
          node = this.root
        }
      } // ::
      else {
        // 대칭 케이스
        let sibling = parent.lchild

        if (sibling !== null && sibling.isRed) {
          sibling.isRed = false
          parent.isRed = true
          this._rotateRight(parent)
          sibling = parent.lchild
        }

        if (
          (sibling === null || !sibling.isRed) &&
          (sibling === null || sibling.lchild === null || !sibling.lchild.isRed) &&
          (sibling === null || sibling.rchild === null || !sibling.rchild.isRed)
        ) {
          if (sibling !== null) {
            sibling.isRed = true
          }
          node = parent
          parent = node.parent
        } // ::
        else {
          if (sibling === null || sibling.lchild === null || !sibling.lchild.isRed) {
            if (sibling !== null && sibling.rchild !== null) {
              sibling.rchild.isRed = false
            }
            if (sibling !== null) {
              sibling.isRed = true
            }
            if (sibling !== null) {
              this._rotateLeft(sibling)
            }
            sibling = parent.lchild
          }

          if (sibling !== null) {
            sibling.isRed = parent.isRed
          }
          parent.isRed = false
          if (sibling !== null && sibling.lchild !== null) {
            sibling.lchild.isRed = false
          }
          this._rotateRight(parent)
          node = this.root
        }
      }
    }

    if (node !== null) {
      node.isRed = false
    }
  }

  // 왼쪽 회전
  _rotateLeft(node) {
    const rightChild = node.rchild
    if (rightChild === null) return

    node.rchild = rightChild.lchild
    if (rightChild.lchild !== null) {
      rightChild.lchild.parent = node
    }

    rightChild.parent = node.parent
    if (node.parent === null) {
      this.root = rightChild
    } // ::
    else if (node === node.parent.lchild) {
      node.parent.lchild = rightChild
    } // ::
    else {
      node.parent.rchild = rightChild
    }

    rightChild.lchild = node
    node.parent = rightChild

    // numNodes 업데이트
    node.numNodes = (node.lchild ? node.lchild.numNodes : 0) + (node.rchild ? node.rchild.numNodes : 0) + 1
    rightChild.numNodes = (rightChild.lchild ? rightChild.lchild.numNodes : 0) + (rightChild.rchild ? rightChild.rchild.numNodes : 0) + 1
  }

  // 오른쪽 회전
  _rotateRight(node) {
    const leftChild = node.lchild
    if (leftChild === null) return

    node.lchild = leftChild.rchild
    if (leftChild.rchild !== null) {
      leftChild.rchild.parent = node
    }

    leftChild.parent = node.parent
    if (node.parent === null) {
      this.root = leftChild
    } // ::
    else if (node === node.parent.lchild) {
      node.parent.lchild = leftChild
    } // ::
    else {
      node.parent.rchild = leftChild
    }

    leftChild.rchild = node
    node.parent = leftChild

    // numNodes 업데이트
    node.numNodes = (node.lchild ? node.lchild.numNodes : 0) + (node.rchild ? node.rchild.numNodes : 0) + 1
    leftChild.numNodes = (leftChild.lchild ? leftChild.lchild.numNodes : 0) + (leftChild.rchild ? leftChild.rchild.numNodes : 0) + 1
  }
}

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

// 보석의 정보를 우선순위큐에 저장한다.
const jewelPQ = new PriorityQueue(N, cmpJewel)
jewelArr.forEach(jewel => {
  jewelPQ.push(jewel)
})

// 가방의 정보를 RBT 에 저장한다.
const bagTree = new RBT(cmpBag)
bagArr.forEach(bag => {
  bagTree.insert(bag)
})

// 결과 변수
let result = 0

while (jewelPQ.size() > 0) {
  const jewel = jewelPQ.pop()

  const [M, V] = jewel

  // 보석이 들어갈 가방이 있는지 찾는다.
  // 이왕하면 가장 최대무게가 낮은 가방을 고른다.
  const bagNode = bagTree.findNodeGreaterOrEqual(M)
  if (bagNode !== null) {
    result += V
    bagTree.deleteNode(bagNode)
  }
}

// 결과 출력
process.stdout.write(`${result}`)

function cmpBag(a, b) {
  return a < b
}

// 가치가 높은걸 최우선순위로 둔다.
// 가치가 같으면 무게가 무거운것부터 넣을 가방을 찾는다.
function cmpJewel(a, b) {
  if (a[1] !== b[1]) return a[1] > b[1]
  else return a[0] > b[0]
}
