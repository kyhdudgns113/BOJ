// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const A = inputArr[0].trim().split('')
const B = inputArr[1].trim().split('')

// maxArr[i][j] : A[i], B[j] 까지 LCS 중 최대길이 같은것
// prevArr[i][j]: A[i], B[j] 까지 최대 LCS 를 만들때, 가장 가까운 인덱스쌍 같은것
const maxArr = Array.from({length: A.length + 1}, () => Array.from({length: B.length + 1}).fill(0))
const prevArr = Array.from({length: A.length + 1}, () => Array.from({length: B.length + 1}, () => [-1, -1]))

for (let a = 0; a < A.length; a++) {
  for (let b = 0; b < B.length; b++) {
    const nowMax = maxArr[a][b]
    if (A[a] === B[b]) {
      maxArr[a][b] = nowMax + 1
      if (maxArr[a + 1][b + 1] < nowMax + 1) {
        maxArr[a + 1][b + 1] = nowMax + 1
        prevArr[a + 1][b + 1] = [a, b]
      }
    } // ::
    else {
      if (maxArr[a + 1][b] < nowMax) {
        maxArr[a + 1][b] = nowMax
        prevArr[a + 1][b] = prevArr[a][b]
      }
      if (maxArr[a][b + 1] < nowMax) {
        maxArr[a][b + 1] = nowMax
        prevArr[a][b + 1] = prevArr[a][b]
      }
    }
  }
}

// 최대길이가 저장된곳을 찾는다.
let nowA = -1
let nowB = -1
let maxResult = 0

for (let a = 0; a <= A.length; a++) {
  for (let b = 0; b <= B.length; b++) {
    if (maxArr[a][b] > maxResult) {
      maxResult = maxArr[a][b]
      nowA = a
      nowB = b
    }
  }
}

const resultArr = []

while (nowA !== -1) {
  resultArr.push(A[nowA])
  const [_a, _b] = prevArr[nowA][nowB]
  nowA = _a
  nowB = _b
}

resultArr.reverse()

process.stdout.write(`${resultArr.length}\n`)
if (resultArr.length > 0) {
  process.stdout.write(`${resultArr.join('')}`)
}
