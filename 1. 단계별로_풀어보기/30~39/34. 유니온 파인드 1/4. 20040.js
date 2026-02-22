// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].split(' ').map(Number)
const queryArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

const unionArr = Array.from({length: N})
  .fill(0)
  .map((_, idx) => idx)

let i = 0
for (i = 0; i < M; i++) {
  const [A, B] = queryArr[i]

  if (isSameUnion(A, B)) {
    process.stdout.write(`${i + 1}`)
    break
  }

  joinUnion(A, B)
}

if (i === M) {
  process.stdout.write('0')
}

function isSameUnion(a, b) {
  return getUnion(a) === getUnion(b)
}

function joinUnion(a, b) {
  const smaller = Math.min(a, b)
  const bigger = Math.max(a, b)

  const smallerUnion = getUnion(smaller)
  const biggerUnion = getUnion(bigger)

  unionArr[biggerUnion] = smallerUnion
}

function getUnion(val) {
  const union = unionArr[val]

  if (union === val) {
    return union
  }

  unionArr[val] = getUnion(union)

  return unionArr[val]
}
