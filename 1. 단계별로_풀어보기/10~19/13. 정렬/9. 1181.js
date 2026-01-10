// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const wordArr = inputArr.slice(1)

// 정렬
wordArr.sort((a, b) => {
  if (a.length < b.length) return -1
  else if (a.length === b.length) return a.localeCompare(b)
  else return 1
})

// 출력
for (let i = 0; i < wordArr.length; i++) {
  if (i > 0 && wordArr[i - 1] === wordArr[i]) continue

  process.stdout.write(wordArr[i] + '\n')
}
