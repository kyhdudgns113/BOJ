// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
// visitList 는 인덱스 접근을 편하게 하기 위해 1씩 뺸다.
const N = +inputArr[0]
const M = +inputArr[1]
const connInfoArr = inputArr.slice(2, N + 2).map(row => row.trim().split(' ').map(Number))
const visitList = inputArr[N + 2].split(' ').map(str => +str - 1)

// unionArr[i]: i 가 속한 집합
const unionArr = Array.from({length: N})
  .fill(0)
  .map((_, idx) => idx)

for (let a = 0; a < N; a++) {
  for (let b = 0; b < N; b++) {
    if (connInfoArr[a][b] === 1) {
      joinUnion(a, b)
    }
  }
}

result = 'YES'
for (let m = 1; m < M; m++) {
  const A = visitList[m - 1]
  const B = visitList[m]
  if (!isSameUnion(A, B)) {
    result = 'NO'
  }
}

// 출력
process.stdout.write(result)

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
