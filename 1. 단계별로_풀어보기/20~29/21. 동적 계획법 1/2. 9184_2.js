// Bottom-Up 방식으로 풀었다.
// 함수 호출이 적기 때문에 실행속도가 빨라진다.

// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const testArr = inputArr.map(row => row.split(' ').map(Number)).filter(val => val[0] !== -1 || val[1] !== -1 || val[2] !== -1)

// 저장할 w
const w = Array.from({length: 22}, () => Array.from({length: 22}, () => Array.from({length: 22}, () => 0)))

// 1번째 조건에 대한 연산
w[0][0][0] = 1
for (let i = 0; i <= 20; i++) {
  for (let j = 0; j <= 20; j++) {
    w[i][j][0] = 1
    w[i][0][j] = 1
    w[0][i][j] = 1
  }
}

let sumABC = 0

// w 연산
while (sumABC < 60) {
  for (let a = 0; a <= 20 && a <= sumABC; a++) {
    for (let b = 0; b <= 20 && a + b <= sumABC; b++) {
      const c = sumABC - a - b

      if (c > 20) continue

      const val = w[a][b][c]

      // 3번째 조건에 대한 연산
      if (0 < a && a < b && b < c + 1) {
        w[a][b][c + 1] += val
      } // ::
      if (0 < a && a < b + 1 && b < c) {
        w[a][b + 1][c + 1] += val
      } // ::
      if (0 < a && a < b + 1 && b + 1 < c) {
        w[a][b + 1][c] -= val
      }

      // 4번째 조건에 대한 연산
      if ((a + 1 >= b || b >= c) && c > 0 && b > 0) {
        w[a + 1][b][c] += val
      } // ::
      if ((a + 1 >= b + 1 || b + 1 >= c) && c > 0) {
        w[a + 1][b + 1][c] += val
      } // ::
      if ((a + 1 >= b || b >= c + 1) && b > 0) {
        w[a + 1][b][c + 1] += val
      } // ::
      if (a >= b || b >= c) {
        w[a + 1][b + 1][c + 1] -= val
      }
    }
  }

  sumABC++
}

// 출력 변수
let resultStr = ''

testArr.forEach(test => {
  const [a, b, c] = test

  if (a <= 0 || b <= 0 || c <= 0) {
    resultStr += `w(${a}, ${b}, ${c}) = 1\n`
  } // ::
  else if (a > 20 || b > 20 || c > 20) {
    resultStr += `w(${a}, ${b}, ${c}) = ${w[20][20][20]}\n`
  } // ::
  else {
    resultStr += `w(${a}, ${b}, ${c}) = ${w[a][b][c]}\n`
  }
})

// 출력
process.stdout.write(resultStr)
