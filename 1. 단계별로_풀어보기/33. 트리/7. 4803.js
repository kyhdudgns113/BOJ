// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 글로벌 변수처럼 쓸 변수들
let treeInfoArr = []
let connInfoArr = []
let parentArr = new Array(501)

// 입력 파싱 및 연산 수행
let remain = 0
let cntCase = 1
inputArr.map((inputRow, rowIdx) => {
  if (remain === 0) {
    const [N, M] = inputArr[rowIdx].trim().split(' ').map(Number)

    if (N === 0) {
      return null
    }

    treeInfoArr = inputArr.slice(rowIdx + 1, rowIdx + M + 1).map(row => row.trim().split(' ').map(Number))
    connInfoArr = Array.from({length: N + 1}, () => [])
    parentArr.fill(0)

    treeInfoArr.forEach(info => {
      const [A, B] = info
      connInfoArr[A].push(B)
      connInfoArr[B].push(A)
    })

    printQueryResult(cntCase, N)
    cntCase++

    remain = M
  } // ::
  else {
    remain--
    return null
  }
})

function printQueryResult(cntCase, N) {
  let numTree = 0
  for (let i = 1; i <= N; i++) {
    if (parentArr[i] === 0) {
      parentArr[i] = i
      numTree += isTree(i, i) ? 1 : 0
    }
  }

  if (numTree > 1) {
    process.stdout.write(`Case ${cntCase}: A forest of ${numTree} trees.\n`)
  } // ::
  else if (numTree === 1) {
    process.stdout.write(`Case ${cntCase}: There is one tree.\n`)
  } // ::
  else {
    process.stdout.write(`Case ${cntCase}: No trees.\n`)
  }
}

function isTree(parent, now) {
  let result = true

  for (let i = 0; i < connInfoArr[now].length; i++) {
    const child = connInfoArr[now][i]

    if (child !== parent) {
      if (parentArr[child] !== 0) {
        result = false
      } // ::
      else {
        parentArr[child] = now
        const tempResult = isTree(now, child)
        result &= tempResult
      }
    }
  }

  return result
}
