// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

let sumMother = 0
let sumSon = 0

const scoreMap = {
  'A+': 4.5,
  A0: 4.0,
  'B+': 3.5,
  B0: 3.0,
  'C+': 2.5,
  C0: 2.0,
  'D+': 1.5,
  D0: 1.0,
  F: 0
}

inputArr.forEach(input => {
  const [title, mother, grade] = input.trim().split(' ')
  const motherNum = parseFloat(mother)

  if (grade !== 'P') {
    sumMother += motherNum
    sumSon += motherNum * scoreMap[grade]
  }
})

process.stdout.write(`${sumSon / sumMother}`)
