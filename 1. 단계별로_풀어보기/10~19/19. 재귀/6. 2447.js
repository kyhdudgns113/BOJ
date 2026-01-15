// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 결과 저장 배열
const resultArr = Array.from({length: N}).map(_ => Array.from({length: N}).fill(' '))

// 연산
recursion(0, N, 0, N)

let resultStr = ''
resultArr.forEach(result => {
  resultStr += result.join('') + '\n'
})

// 출력
process.stdout.write(resultStr)

function recursion(row0, row1, col0, col1) {
  const tempN = Math.floor((row1 - row0) / 3)

  if (row0 === row1) {
    resultArr[row0][col0] = '*'
    return
  }

  for (let i = 0; i < 3; i++) {
    const baseRow = row0 + i * tempN

    for (let j = 0; j < 3; j++) {
      const baseCol = col0 + j * tempN
      if (i * j === 1) continue

      recursion(baseRow, baseRow + tempN, baseCol, baseCol + tempN)
    }
  }
}
