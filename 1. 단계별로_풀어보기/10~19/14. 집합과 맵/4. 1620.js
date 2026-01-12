// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].split(' ').map(Number)
const pokeArr = inputArr.slice(1, N + 1).map(row => row.trim())
const queryArr = inputArr.slice(N + 1).map(row => row.trim())

// 순서 저장할 dictionary
const dict = {}

// 순서 저장
pokeArr.forEach((name, idx) => (dict[name] = idx + 1))

queryArr.forEach(query => {
  const idx = +query

  if (idx) process.stdout.write(`${pokeArr[idx - 1]}\n`)
  else process.stdout.write(`${dict[query]}\n`)
})
