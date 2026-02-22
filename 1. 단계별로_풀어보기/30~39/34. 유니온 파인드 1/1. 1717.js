// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].split(' ').map(Number)
const queryArr = inputArr.slice(1).map(row => row.split(' ').map(Number))

// unionArr[i]: i 가 속한 유니온. 초기값은 본인
const unionArr = Array.from({length: N + 1})
  .fill(0)
  .map((_, idx) => idx)

// 출력 변수
let resultStr = ''

// 쿼리마다 연산 실행
queryArr.forEach(query => {
  const [op, a, b] = query

  if (op === 0) {
    joinUnion(a, b)
  } // ::
  else {
    resultStr += isSameUnion(a, b) ? 'YES\n' : 'NO\n'
  }
})

process.stdout.write(resultStr)

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
