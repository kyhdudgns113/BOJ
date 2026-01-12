// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const logArr = inputArr.slice(1).map(row => row.trim().split(' '))

// 출퇴근 여부 저장할 변수
const dict = {}

logArr.forEach(log => {
  const [name, status] = log

  if (status === 'enter') {
    dict[name] = true
  } //
  else {
    dict[name] = false
  }
})

// 결과값 저장
const resultArr = Object.keys(dict).filter(name => dict[name])

// 남아있는 사람 사전순으로 정렬
resultArr.sort().reverse()

let result = ''
resultArr.forEach(name => {
  result += name + '\n'
})

process.stdout.write(result)
