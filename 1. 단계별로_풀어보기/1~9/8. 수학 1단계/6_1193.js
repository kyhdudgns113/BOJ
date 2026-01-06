// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 입력 파싱
const X = +inputArr[0]

// 분자, 분모 합 계산
const S = Math.ceil(0.5 + Math.sqrt(2 * X + 0.25))

// 합이 S 인 경우중 몇 번째인지 계산
const idx = X - ((S - 1) * (S - 2)) / 2 - 1

// 분자가 1로 시작하는지 여부
const isStartSon = S % 2 === 1

// 분자와 분모 계산
let son = 0
let mother = 0

if (isStartSon) {
  son = 1 + idx
  mother = S - son
} // ::
else {
  mother = 1 + idx
  son = S - mother
}

// 출력
process.stdout.write(`${son}/${mother}`)
