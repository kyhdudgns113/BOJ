// 입력
const inputArr = require('fs').readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const numArr = inputArr.slice(1).map(Number)

// 커스텀 병합정렬 수행
mergeSort(numArr, cmpASC)

// 출력 결과 하나의 문자열로 만들기
let resultString = ''

numArr.forEach(num => {
  resultString += num.toString() + '\n'
})

// 출력
process.stdout.write(resultString)

// 커스텀 함수: 병합 정렬
function mergeSort(argArr, cmp) {
  // 종료 조건
  if (argArr.length === 1) return

  const halfIdx = Math.floor(argArr.length / 2)
  const preArr = [...argArr.slice(0, halfIdx)]
  const postArr = [...argArr.slice(halfIdx)]

  mergeSort(preArr, cmp)
  mergeSort(postArr, cmp)

  let argIdx = 0
  let preIdx = 0
  let postIdx = 0

  while (preIdx < preArr.length && postIdx < postArr.length) {
    if (cmp(preArr[preIdx], postArr[postIdx])) {
      argArr[argIdx] = preArr[preIdx]
      argIdx += 1
      preIdx += 1
    } //
    else {
      argArr[argIdx] = postArr[postIdx]
      argIdx += 1
      postIdx += 1
    }
  }

  while (preIdx < preArr.length) {
    argArr[argIdx] = preArr[preIdx]
    argIdx += 1
    preIdx += 1
  }

  while (postIdx < postArr.length) {
    argArr[argIdx] = postArr[postIdx]
    argIdx += 1
    postIdx += 1
  }
}

// 커스텀 함수: 비교 함수
function cmpASC(a, b) {
  return a <= b
}
