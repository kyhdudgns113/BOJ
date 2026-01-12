// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [aSon, aMom] = inputArr[0].split(' ').map(Number)
const [bSon, bMom] = inputArr[1].split(' ').map(Number)

// 분자, 분모 계산
const rSon = aSon * bMom + bSon * aMom
const rMom = aMom * bMom

// GCD 구하기
const gcd = GCD(Math.max(rSon, rMom), Math.min(rSon, rMom))

const resultSon = Math.floor(rSon / gcd)
const resultMom = Math.floor(rMom / gcd)

// 결과 출력
process.stdout.write(`${resultSon} ${resultMom}`)

function GCD(bigger, lower) {
  if (bigger % lower === 0) {
    return lower
  }

  return GCD(lower, bigger % lower)
}
