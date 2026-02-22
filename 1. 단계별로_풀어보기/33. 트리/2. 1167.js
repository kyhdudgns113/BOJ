// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const V = +inputArr[0]
const rowNumArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// connInfoArr[i]: i 와 연결된 정점 정보(도착점, 거리)의 배열
const connInfoArr = Array.from({length: V + 1}, () => [])
rowNumArr.forEach(rowNum => {
  const start = rowNum[0]
  for (let i = 1; i < rowNum.length; i += 2 /* 2씩 늘린다, */) {
    if (rowNum[i] === -1) {
      break
    }

    const next = rowNum[i]
    const dist = rowNum[i + 1]

    connInfoArr[start].push([next, dist])
  }
})

// 루트노드를 1로 설정
const ROOT_NODE = 1

// depthArr[i]: i 와 자손노드와의 거리중 가장 긴 것
// parentArr[i]: i 의 부모노드
const depthArr = Array.from({length: V + 1}).fill(0)
const parentArr = Array.from({length: V + 1}).fill(-1)

parentArr[0] = 0
parentArr[ROOT_NODE] = 0

// BFS 용 방문큐
const visitQueue = Array.from({length: V + 2}).fill(0)
let stackIdx = -1

visitQueue[++stackIdx] = [ROOT_NODE, parentArr[ROOT_NODE]]

let result = 0

while (stackIdx >= 0) {
  const [now, parent] = visitQueue[stackIdx]

  parentArr[now] = parent

  let childFirst = false
  let i = 0
  let temp0 = 0
  let temp1 = 0

  for (i = 0; i < connInfoArr[now].length; i++) {
    const [next, dist] = connInfoArr[now][i]

    if (parentArr[next] === -1) {
      visitQueue[++stackIdx] = [next, now]
      childFirst = true
    } // ::
    else if (parentArr[next] === now) {
      const temp = depthArr[next] + dist

      if (temp0 < temp) {
        temp1 = temp0
        temp0 = temp
      } // ::
      else if (temp1 < temp) {
        temp1 = temp
      }
    }
  }

  // 만약 자식먼저 연산해야하면 이번턴은 넘긴다.
  if (childFirst) {
    continue
  }

  result = Math.max(result, temp0 + temp1)

  depthArr[now] = temp0

  if (parentArr[visitQueue[stackIdx + 1]] === -1) {
    stackIdx++
  } // ::
  else {
    stackIdx--
  }
}

process.stdout.write(`${result}`)
