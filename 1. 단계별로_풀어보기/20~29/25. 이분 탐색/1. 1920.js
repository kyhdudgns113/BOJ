// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split("\n")

const numArr = inputArr[1].trim().split(' ').map(Number)
const queryArr = inputArr[3].trim().split(' ').map(Number)

// map 에 존재하는 숫자들 저장: O(N log N)
const numMap = {}
numArr.forEach(num => numMap[num] = 1)

// 쿼리마다 숫자 존재하는지 확인: O(Q log N)
let resultStr = ''
queryArr.forEach(query => resultStr += (numMap[query] === 1 ? 1 : 0) + '\n')

// 출력
process.stdout.write(resultStr)