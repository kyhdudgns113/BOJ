// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const treeInfoArr = inputArr.slice(1).map(row => row.trim().split(' '))

// 자식노드들의 목록 배열
const childArr = Array.from({length: 256}, () => [null, null])

const asciiA = 'A'.charCodeAt(0)
const asciiZ = 'Z'.charCodeAt(0)

treeInfoArr.forEach(info => {
  const [parent, lchild, rchild] = info

  const asciiParent = parent.charCodeAt(0)
  const asciiLeft = lchild.charCodeAt(0)
  const asciiRight = rchild.charCodeAt(0)

  if (asciiA <= asciiLeft && asciiLeft <= asciiZ) {
    childArr[asciiParent][0] = asciiLeft
  }
  if (asciiA <= asciiRight && asciiRight <= asciiZ) {
    childArr[asciiParent][1] = asciiRight
  }
})

process.stdout.write(`${VLR(asciiA)}\n`)
process.stdout.write(`${LVR(asciiA)}\n`)
process.stdout.write(`${LRV(asciiA)}\n`)

function VLR(now) {
  let result = String.fromCharCode(now)

  let lchild = childArr[now][0]
  let rchild = childArr[now][1]

  if (lchild) {
    result += VLR(lchild)
  }
  if (rchild) {
    result += VLR(rchild)
  }
  return result
}
function LVR(now) {
  let result = String.fromCharCode(now)

  let lchild = childArr[now][0]
  let rchild = childArr[now][1]

  if (lchild) {
    result = LVR(lchild) + result
  }
  if (rchild) {
    result = result + LVR(rchild)
  }
  return result
}
function LRV(now) {
  let result = ''

  let lchild = childArr[now][0]
  let rchild = childArr[now][1]

  if (lchild) {
    result += LRV(lchild)
  }
  if (rchild) {
    result += LRV(rchild)
  }
  result += String.fromCharCode(now)
  return result
}
