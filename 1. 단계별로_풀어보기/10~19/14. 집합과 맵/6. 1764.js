// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].split(' ').map(Number)
const listenArr = inputArr.slice(1, N + 1).map(name => name.trim())
const lookArr = inputArr.slice(N + 1).map(name => name.trim())

// 듣도 못한 사람 dictionary 에 저장
const listenDict = {}

listenArr.forEach(name => (listenDict[name] = 1))

// 보도 못한 사람중 듣도 못한 사람만 필터링
const deutBoArr = lookArr.filter(name => listenDict[name] === 1)

// 사전순 정렬
deutBoArr.sort()

// 출력 문자열 생성
let result = `${deutBoArr.length}\n`
deutBoArr.forEach(name => (result += name + '\n'))

// 출력
process.stdout.write(result)
