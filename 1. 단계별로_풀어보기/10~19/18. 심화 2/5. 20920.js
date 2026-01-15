// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱. 단어는 길이가 M 이상인것만 저장한다.
const [N, M] = inputArr[0].split(' ').map(Number)
const wordArr = inputArr
  .slice(1)
  .map(row => row.trim())
  .filter(word => word.length >= M)

// 등장 횟수 저장할 변수
const cntDict = {}

// 등장횟수 카운팅
wordArr.forEach(word => {
  if (!cntDict[word]) {
    cntDict[word] = 1
  } // ::
  else {
    cntDict[word] += 1
  }
})

// 중복 제거한 단어 배열
const remainArr = Object.keys(cntDict)

// 정렬
remainArr.sort((a, b) => {
  if (cntDict[a] !== cntDict[b]) {
    return cntDict[b] - cntDict[a]
  } // ::
  else if (a.length !== b.length) {
    return b.length - a.length
  } // ::
  else {
    return a.localeCompare(b)
  }
})

// 출력 변수
let resultStr = ''

remainArr.forEach(word => {
  resultStr += word + '\n'
})

// 출력
process.stdout.write(resultStr)
