// 입력 모듈
const fs = require('fs')

// 입력 저장
let N = 0
const connInfoArr = Array.from({length: 300001}, () => [])

fs.readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .forEach((inputRow, rowIdx) => {
    if (rowIdx === 0) {
      N = +inputRow
    } // ::
    else {
      const [U, V, W] = inputRow.trim().split(' ').map(Number)
      connInfoArr[U].push([V, W])
      connInfoArr[V].push([U, W])
    }
  })

/**
 * nowSumArr[i]: i 가 루트일때, 자손들과의 거리합
 * numNodeArr[i]: i 가 루트인 서브트리의 노드 개수(본인 포함)
 * parentArr[i]: i 의 부모노드 번호. 루트의 부모는 0, 설정 안됬으면 -1
 * resultArr[i]: 노드 i 에서 나머지 노드들까지의 거리합
 */
const nowSumArr = Array.from({length: N + 1}).fill(0)
const numNodeArr = Array.from({length: N + 1}).fill(0)
const parentArr = Array.from({length: N + 1}).fill(-1)
const resultArr = Array.from({length: N + 1}).fill(0)

const ROOT_NODE = 1
parentArr[ROOT_NODE] = 0

DFS_1(ROOT_NODE)
DFS_2(ROOT_NODE, 0, 0, 0, 0)

let resultStr = ''
resultArr.slice(1).forEach(res => (resultStr += res + '\n'))
process.stdout.write(resultStr)

function DFS_1(now) {
  let nowSum = 0
  let nowNodes = 1

  connInfoArr[now].forEach(info => {
    const [next, dist] = info

    if (parentArr[next] === -1) {
      parentArr[next] = now
      const [sum, numNode] = DFS_1(next)

      nowSum += sum + dist * numNode
      nowNodes += numNode
    }
  })

  nowSumArr[now] = nowSum
  numNodeArr[now] = nowNodes

  return [nowSum, nowNodes]
}

function DFS_2(now, argSumNow, argSumAcc, argSumLen, distParent) {
  resultArr[now] = nowSumArr[now] + argSumNow + argSumAcc + argSumLen * distParent

  let sumNow = argSumNow
  let sumAcc = argSumAcc
  let sumLen = argSumLen + 1

  connInfoArr[now].forEach(info => {
    const [next, dist] = info
    if (parentArr[next] === now) {
      sumNow += nowSumArr[next]
      sumAcc += numNodeArr[next] * dist
      sumLen += numNodeArr[next]
    }
  })

  sumAcc += argSumLen * distParent

  connInfoArr[now].forEach(info => {
    const [next, dist] = info
    if (parentArr[next] === now) {
      const nextSumNow = sumNow - nowSumArr[next]
      const nextSumAcc = sumAcc - numNodeArr[next] * dist
      const nextSumLen = sumLen - numNodeArr[next]
      DFS_2(next, nextSumNow, nextSumAcc, nextSumLen, dist)
    }
  })
}
