// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const infoArr = inputArr.slice(1).map((inputStr, idx) => {
  const [ageStr, nameStr] = inputStr.split(' ')

  return [+ageStr, nameStr, idx]
})

// 정렬
infoArr.sort((a, b) => {
  if (a[0] < b[0]) return -1
  else if (a[0] === b[0]) return a[2] - b[2]
  else return 1
})

// 출력
infoArr.forEach(info => {
  process.stdout.write(`${info[0]} ${info[1]}\n`)
})
