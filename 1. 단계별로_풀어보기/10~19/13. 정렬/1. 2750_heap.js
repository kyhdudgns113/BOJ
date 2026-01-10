// 입력
const inputArr = require('fs').readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const numArr = inputArr.slice(1).map(Number)

// 정렬 수행
heapSort(numArr, cmpASC)

// 출력
let resultString = ''

for (let num of numArr) {
  resultString += `${num}\n`
}

process.stdout.write(resultString)

// 커스텀 함수: 배열의 힙 화
function heapify(argArr, nowIdx, heapSize, cmp) {
  const leftIdx = 2 * nowIdx + 1
  const rightIdx = 2 * nowIdx + 2
  let largestIdx = nowIdx

  if (leftIdx < heapSize && !cmp(argArr[leftIdx], argArr[largestIdx])) {
    largestIdx = leftIdx
  }

  if (rightIdx < heapSize && !cmp(argArr[rightIdx], argArr[largestIdx])) {
    largestIdx = rightIdx
  }

  if (largestIdx !== nowIdx) {
    const temp = argArr[nowIdx]
    argArr[nowIdx] = argArr[largestIdx]
    argArr[largestIdx] = temp
    heapify(argArr, largestIdx, heapSize, cmp)
  }
}

// 커스텀 함수: 힙 정렬
function heapSort(argArr, cmp) {
  const n = argArr.length

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(argArr, i, n, cmp)
  }

  for (let lastIdx = n - 1; lastIdx > 0; lastIdx--) {
    const temp = argArr[0]
    argArr[0] = argArr[lastIdx]
    argArr[lastIdx] = temp

    heapify(argArr, 0, lastIdx, cmp)
  }
}

function cmpASC(a, b) {
  return a <= b
}
