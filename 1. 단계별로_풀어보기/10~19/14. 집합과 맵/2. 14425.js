// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].split(' ').map(Number)

const SArr = inputArr.slice(1, N + 1)
const TestArr = inputArr.slice(N + 1)

// dictionary 에 넣기
const dict = {}
SArr.forEach(word => (dict[word] = true))

// 존재하는 갯수 세기
const result = TestArr.filter(word => dict[word]).length

// 출력
process.stdout.write(`${result}`)
