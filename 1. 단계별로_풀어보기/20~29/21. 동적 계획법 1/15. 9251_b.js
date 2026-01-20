// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const A = inputArr[0].trim().split('')
const B = inputArr[1].trim().split('')

// 길이 변수
const lenA = A.length
const lenB = B.length

// 결과 배열
const resultArr = Array.from({length: lenA + 1}, () => Array.from({length: lenB + 1}).fill(0))

// 결과 저장할 변수
let result = 0

// Bottom-Up 연산
for (let a = 0; a < lenA; a++) {
  for (let b = 0; b < lenB; b++) {
    if (A[a] === B[b]) {
      resultArr[a][b] += 1
      resultArr[a + 1][b + 1] = Math.max(resultArr[a + 1][b + 1], resultArr[a][b])
    } // ::
    else {
      resultArr[a + 1][b] = Math.max(resultArr[a + 1][b], resultArr[a][b])
      resultArr[a][b + 1] = Math.max(resultArr[a][b + 1], resultArr[a][b])
    }
    result = Math.max(result, resultArr[a][b])
  }
}

// 결과 구하기
result = Math.max(result, resultArr[lenA][lenB], resultArr[lenA - 1][lenB], resultArr[lenA][lenB - 1])

// 출력
process.stdout.write(`${result}`)
