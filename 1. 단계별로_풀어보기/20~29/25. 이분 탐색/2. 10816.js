// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const cardArr = inputArr[1].trim().split(' ').map(Number)
const queryArr = inputArr[3].trim().split(' ').map(Number)

// 해시맵
const cardMap = {}

// 해시맵 저장
cardArr.forEach(card => {
  if (cardMap[card] > 0) {
    cardMap[card]++
  } // ::
  else {
    cardMap[card] = 1
  }
})

// 쿼리 수행
let resultStr = ''
queryArr.forEach(query => {
  resultStr += (cardMap[query] > 0 ? cardMap[query] : 0) + ' '
})

// 출력
process.stdout.write(resultStr)