// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const treeInfoArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

const connInfoArr = Array.from({length: N + 1}, () => [])
treeInfoArr.forEach(info => {
  const [parent, child, dist] = info
  connInfoArr[parent].push([child, dist])
})

// 루트노드 번호 설정
const ROOT_NODE = 1

const depthArr = Array.from({length: N + 1}).fill(0)
const parentArr = Array.from({length: N + 1}).fill(-1)

parentArr[ROOT_NODE] = 0

// BFS 용 큐 역할을 할 배열
const BFSQueue = Array.from({length: N + 1}).fill(null)
let nowIdx = 0
let insertIdx = 0

BFSQueue[insertIdx++] = [ROOT_NODE, parentArr[ROOT_NODE]]

let result = 0
let isCameBack = false

while (nowIdx >= 0) {
  const [now, parent] = BFSQueue[nowIdx]

  let isChildFirst = false
  let temp0 = 0
  let temp1 = 0

  for (let i = 0; i < connInfoArr[now].length; i++) {
    const [child, dist] = connInfoArr[now][i]

    if (parentArr[child] === -1) {
      isChildFirst = true
      parentArr[child] = now
      BFSQueue[insertIdx++] = [child, now]
    } // ::
    else {
      const childDist = depthArr[child] + dist

      if (temp0 < childDist) {
        temp1 = temp0
        temp0 = childDist
      } // ::
      else if (temp1 < childDist) {
        temp1 = childDist
      }
    }
  }

  if (isChildFirst) {
    nowIdx++
    continue
  }

  if (BFSQueue[nowIdx + 1] === null) {
    isCameBack = true
  }

  depthArr[now] = temp0
  result = Math.max(result, temp0 + temp1)

  if (isCameBack) {
    nowIdx--
  } // ::
  else {
    nowIdx++
  }
}

console.log(`${result}`)
