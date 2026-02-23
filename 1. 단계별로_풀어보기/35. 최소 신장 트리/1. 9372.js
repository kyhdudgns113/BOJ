// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
let remain = 0
const T = +inputArr[0]
const testCases = inputArr.slice(1).map((_, inputIdx) => {
  if (remain === 0) {
    const [N, M] = inputArr[inputIdx + 1].trim().split(' ').map(Number)
    const abArr = inputArr.slice(inputIdx + 2, inputIdx + 2 + M).map(row => row.trim().split(' ').map(Number))

    remain = M

    // 출력
    process.stdout.write(`${N - 1}\n`)

    return [N, M, abArr]
  } // ::
  else {
    remain--
    return null
  }
})
