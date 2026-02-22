// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
let remain = 0
const T = +inputArr[0]
const testCases = inputArr
  .slice(1)
  .map((_, rowIdx) => {
    if (remain === 0) {
      const F = +inputArr[rowIdx + 1]
      const queryArr = inputArr.slice(rowIdx + 2, rowIdx + 2 + F).map(row => row.trim().split(' '))

      remain = F
      return queryArr
    } // ::
    else {
      remain--
      return null
    }
  })
  .filter(block => block !== null)

let unionMap = {}
let numMemMap = {}

testCases.forEach(queryArr => {
  unionMap = {}
  numMemMap = {}
  queryArr.forEach(query => {
    const [A, B] = query

    if (!unionMap[A]) {
      unionMap[A] = A
      numMemMap[A] = 1
    }

    if (!unionMap[B]) {
      unionMap[B] = B
      numMemMap[B] = 1
    }

    process.stdout.write(`${joinUnion(A, B)}\n`)
  })
})

function joinUnion(a, b) {
  let smaller = a
  let bigger = b

  if (a.localeCompare(b) > 0) {
    smaller = b
    bigger = a
  }

  const smallerUnion = getUnion(smaller)
  const biggerUnion = getUnion(bigger)

  if (smallerUnion !== biggerUnion) {
    unionMap[biggerUnion] = smallerUnion
    numMemMap[smallerUnion] += numMemMap[biggerUnion]
  }

  return numMemMap[smallerUnion]
}

function getUnion(val) {
  if (unionMap[val] === val) {
    return val
  }

  unionMap[val] = getUnion(unionMap[val])
  return unionMap[val]
}
