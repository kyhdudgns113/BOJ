// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().split('\n')

// 입력 파싱
const N = +inputArr[0]

// 결과 저장할 배열
const resultArr = Array.from({length: N + 1}, () => Array.from({length: 10}, () => 0))

// 초기값 설정
// 길이가 1일때 1~9 로 끝나는 경우의 수는 각각 1이다.
for (let i = 1; i < 10; i++) {
  resultArr[1][i] = 1
}

// Bottom-Up 연산
for (let len = 1; len < N; len++) {
  for (let num = 0; num < 10; num++) {
    const nowVal = resultArr[len][num]

    if (num > 0) {
      resultArr[len + 1][num - 1] += nowVal
      resultArr[len + 1][num - 1] %= 1000000000
    }

    if (num < 9) {
      resultArr[len + 1][num + 1] += nowVal
      resultArr[len + 1][num + 1] %= 1000000000
    }
  }
}

// 결과 연산
const result = resultArr[N].reduce((prev, val) => prev = (prev + val) % 1000000000, 0)

// 출력
process.stdout.write(`${result}`)