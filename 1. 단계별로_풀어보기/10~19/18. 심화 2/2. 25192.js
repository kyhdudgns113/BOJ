// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const logArr = inputArr.slice(1).map(row => row.trim())

// 곰곰티콘 보낸 유저를 Set 형태로 저장
let dict = {}

// 곰곰티콘 사용횟수
let result = 0

// 로그마다 연산
logArr.forEach(log => {
  if (log === 'ENTER') {
    dict = {}
    return
  }

  if (dict[log] !== 1) {
    dict[log] = 1
    result += 1
  }
})

// 결과 출력
process.stdout.write(`${result}`)
