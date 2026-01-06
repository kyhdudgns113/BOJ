// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const numArr = inputArr[1].trim().split(' ').map(Number)

// 해당 숫자가 소수인지 저장
const isPrimeArr = Array.from({length: 1001}).fill(true)
isPrimeArr[0] = false
isPrimeArr[1] = false

// 소수 체크 (에라토스테네스의 체)
for (let i = 2; i <= 40; i++) {
  const nowNumber = i

  if (isPrimeArr[nowNumber]) {
    let temp = nowNumber * 2
    while (temp <= 1000) {
      isPrimeArr[temp] = false
      temp += nowNumber
    }
  }
}

// 배열에서 소수 개수 체크
const result = numArr.filter(numb => isPrimeArr[numb]).length

// 출력
process.stdout.write(`${result}`)
