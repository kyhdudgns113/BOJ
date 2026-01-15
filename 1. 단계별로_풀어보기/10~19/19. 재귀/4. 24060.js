// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, K] = inputArr[0].split(' ').map(Number)
const A = inputArr[1].split(' ').map(Number)

let tmp = Array.from({length: 500001}).fill(0)

// 출력할 숫자
let result = -1
let idxK = 0

mergeSort(0, N - 1)

process.stdout.write(`${result}`)

function mergeSort(p, r) {
  if (p < r) {
    const q = Math.floor((p + r) / 2)
    mergeSort(p, q)
    mergeSort(q + 1, r)
    merge(p, q, r)
  }
}

function merge(p, q, r) {
  let i = p
  let j = q + 1
  let t = 1

  const tmp = Array.from({})

  while (i <= q && j <= r) {
    if (A[i] <= A[j]) {
      tmp[t++] = A[i++]
    } // ::
    else {
      tmp[t++] = A[j++]
    }
  }

  while (i <= q) {
    tmp[t++] = A[i++]
  }
  while (j <= r) {
    tmp[t++] = A[j++]
  }

  i = p
  t = 1
  while (i <= r) {
    idxK++

    if (idxK === K) {
      result = tmp[t]
    }

    A[i++] = tmp[t++]
  }
}
