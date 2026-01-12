// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [numA, numB] = inputArr[0].split(' ').map(Number)
const AArr = inputArr[1].split(' ').map(Number)
const BArr = inputArr[2].split(' ').map(Number)

// A 원소의 집합화
const ASet = {}
AArr.forEach(val => (ASet[val] = 1))

// A 와 B 의 교집합의 원소 갯수
const shareNum = BArr.filter(val => ASet[val] === 1).length

// 결과 출력
process.stdout.write(`${numA + numB - 2 * shareNum}`)
