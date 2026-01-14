// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const T = +inputArr[0]
const stringArr = inputArr.slice(1).map(str => str.trim().split(''))

// 출력 문자열 변수
let resultStr = ''

// 각 테스트 케이스마다 연산
stringArr.forEach(row => {
  let mustZero = 0
  let lenRow = row.length

  for (let i = 0; i < lenRow; i++) {
    const c = row[i]

    if (c === '(') mustZero += 1
    else mustZero -= 1

    if (mustZero < 0) break
  }

  if (mustZero === 0) {
    resultStr += 'YES\n'
  } //
  else {
    resultStr += 'NO\n'
  }
})

// 출력
process.stdout.write(resultStr)
