// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const treeArr = inputArr.slice(1).map(Number)

// 결과 연산
let result = treeArr[1] - treeArr[0]

for (let i = 1; i < N; i++) {
  const diff = treeArr[i] - treeArr[i - 1]

  result = GCD(result, diff)
}

// 심어져있을 전체 나무 수
const entireTree = Math.floor((treeArr[N - 1] - treeArr[0]) / result) + 1

// 새로 심을 나무 수
const newTree = entireTree - N

// 출력
process.stdout.write(`${newTree}`)

function GCD(a, b) {
  const bigger = Math.max(a, b)
  const lower = Math.min(a, b)
  if (bigger % lower === 0) {
    return lower
  }

  return GCD(lower, bigger % lower)
}
