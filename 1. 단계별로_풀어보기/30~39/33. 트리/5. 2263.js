// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const LVR = inputArr[1].trim().split(' ').map(Number)
const LRV = inputArr[2].trim().split(' ').map(Number)

const position = Array.from({length: N + 1}, () => 0)
for (let i = 0; i < N; i++) {
  position[LVR[i]] = i
}

process.stdout.write(getVLR(0, N - 1, 0, N - 1))

function getVLR(inLeft, inRight, postLeft, postRight) {
  if (inLeft > inRight || postLeft > postRight) {
    return ''
  }
  if (postLeft === postRight) {
    return `${LRV[postRight]} `
  }

  const V = LRV[postRight]

  const delta = position[V] - inLeft

  return `${V} ` + getVLR(inLeft, position[V] - 1, postLeft, postLeft + delta - 1) + getVLR(position[V] + 1, inRight, postLeft + delta, postRight - 1)
}
