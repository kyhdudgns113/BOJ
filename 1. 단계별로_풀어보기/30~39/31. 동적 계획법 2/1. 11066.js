// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
let remain = 0
const T = +inputArr[0]
const queryArr = inputArr
  .slice(1)
  .map((inputRow, rowIdx) => {
    if (remain === 0) {
      const K = +inputArr[rowIdx + 1]
      const fileArr = inputArr[rowIdx + 2].trim().split(' ').map(Number)
      remain = 1
      return [K, fileArr]
    } // ::
    else {
      remain--
      return null
    }
  })
  .filter(block => block !== null)

queryArr.forEach(query => {
  const [K, fileArr] = query

  // 누적합 배열
  const accArr = Array.from({length: K + 1}).fill(0)
  for (let i = 1; i <= K; i++) {
    accArr[i] = accArr[i - 1] + fileArr[i - 1]
  }

  // 결과 배열
  const resultArr = Array.from({length: K}, () => Array.from({length: K}).fill(2000000000))

  for (let i = 0; i < K; i++) {
    resultArr[i][i] = 0
  }

  for (let len = 2; len <= K; len++) {
    for (let start = 0; start + len - 1 < K; start++) {
      const end = start + len - 1

      for (let mid = start; mid < end; mid++) {
        resultArr[start][end] = Math.min(resultArr[start][end], resultArr[start][mid] + resultArr[mid + 1][end] + accArr[end + 1] - accArr[start])
      }
    }
  }

  // 출력
  process.stdout.write(`${resultArr[0][K - 1]}\n`)
})
