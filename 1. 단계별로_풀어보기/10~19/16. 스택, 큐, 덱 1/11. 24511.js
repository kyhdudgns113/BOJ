// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const AArr = inputArr[1].split(' ').map(Number)
const BArr = inputArr[2].split(' ').map(Number)

const M = +inputArr[3]
const CArr = inputArr[4].split(' ').map(Number)

// BArr 에서 Queue 인 경우의 원소만 걸러낸다
const BQueue = BArr.filter((_, idx) => AArr[idx] === 0)

// 맨 뒤 원소가 가장 먼저 나와야 하므로 뒤집는다.
BQueue.reverse()

// BQueue 랑 CArr 를 합친다
const combQueue = [...BQueue, ...CArr]

// 합친 Queue 에서 M 개만 출력한다.
process.stdout.write(`${combQueue.slice(0, M).join(' ')}`)
