// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const A = inputArr[0].trim().split('')
const B = inputArr[1].trim().split('')

// 길이 변수
const lenA = A.length
const lenB = B.length

// NULL 을 의미하는 변수
// 필요를 하진 않지만 아무 값도 아니라는 의미를 위해 사용
const NULL = -1

// 결과 배열
const resultArr = Array.from({length: lenA}, () => Array.from({length: lenB}).fill(NULL))

// 콜스택 선언
const callStack = Array.from({length: 20000}).fill(null)
let stackIdx = -1

// 콜스택에 값 넣기
stackIdx++
callStack[0] = [lenA - 1, lenB - 1]

// Top-Down 비재귀 연산
while (stackIdx >= 0) {
  const [a, b] = callStack[stackIdx]

  // 값이 연산된적 있다면 스킵한다
  if (resultArr[a][b] !== NULL) {
    stackIdx -= 1
    continue
  }

  if (A[a] === B[b]) {
    const n0 = a > 0 && b > 0 ? resultArr[a - 1][b - 1] : 0
    if (n0 === NULL) {
      stackIdx++
      callStack[stackIdx] = [a - 1, b - 1]
      continue
    }

    resultArr[a][b] = n0 + 1
    stackIdx--
  } // ::
  else {
    const na = a > 0 ? resultArr[a - 1][b] : 0
    if (na === NULL) {
      stackIdx++
      callStack[stackIdx] = [a - 1, b]
      continue
    }

    const nb = b > 0 ? resultArr[a][b - 1] : 0
    if (nb === NULL) {
      stackIdx++
      callStack[stackIdx] = [a, b - 1]
      continue
    }

    resultArr[a][b] = Math.max(na, nb)
    stackIdx--
  }
}

// 결과 계산
const result = resultArr[lenA - 1][lenB - 1]

// 출력
process.stdout.write(`${result}`)