// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const cardArr = inputArr[1].split(' ').map(Number)
const M = +inputArr[2]
const queryArr = inputArr[3].split(' ').map(Number)

// 카운팅 저장할 변수
const cntDict = {}

// 카운팅
cardArr.forEach(card => {
  if (!cntDict[card]) cntDict[card] = 1
  else cntDict[card] += 1
})

// 출력
let result = ''
queryArr.forEach(query => {
  if (!cntDict[query]) result += '0 '
  else result += `${cntDict[query]} `
})
process.stdout.write(result)
