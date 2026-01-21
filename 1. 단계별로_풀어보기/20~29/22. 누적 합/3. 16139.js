// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const S = inputArr[0].trim()
const queryArr = inputArr.slice(2).map(row => {
  const [c, i, j] = row.trim().split(' ')
  return [c, +i, +j]
})

// 결과 배열
const sumArr = Array.from({length: 26}, () => Array.from({length: S.length + 1}).fill(0))

// 'a' 의 아스키코드 값
const a = 'a'.charCodeAt(0)

// Bottom-Up 방식으로 sumArr 채우기
for (let i = 1; i <= S.length; i++) {
  for (let c = 0; c < 26; c++) {
    sumArr[c][i] = sumArr[c][i - 1]
  }
  const nowC = S.charCodeAt(i - 1) - a
  sumArr[nowC][i] += 1
}

// 출력 변수
let resultStr = ''

queryArr.forEach(query => {
  const [c, i, j] = query
  const cASCII = c.charCodeAt(0) - a

  resultStr += sumArr[cASCII][j + 1] - sumArr[cASCII][i] + '\n'
})

// 출력
process.stdout.write(`${resultStr}`)
