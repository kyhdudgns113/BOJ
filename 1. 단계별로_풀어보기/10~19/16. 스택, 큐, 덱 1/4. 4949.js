// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const stringArr = inputArr.slice(0, -1).map(str => str.split(''))

// 출력 결과 변수
let resultStr = ''

// 문장마다 연산
stringArr.forEach(charArr => {
  const stack = Array.from({length: 101}).fill('')
  let stackIdx = 0
  let result = 'yes'

  for (let i = 0; i < charArr.length; i++) {
    const c = charArr[i]

    if (c === '(' || c === '[' || c === '{') {
      stack[stackIdx] = c
      stackIdx += 1
    } //
    else if (c === ')' && stackIdx > 0 && stack[stackIdx - 1] === '(') {
      stackIdx -= 1
      // stack[stackIdx] = '' // 이거 안해도 된다.
    } //
    else if (c === ']' && stackIdx > 0 && stack[stackIdx - 1] === '[') {
      stackIdx -= 1
      // stack[stackIdx] = '' // 이거 안해도 된다
    } //
    else if (c === '}' && stackIdx > 0 && stack[stackIdx - 1] === '{') {
      stackIdx -= 1
      // stack[stackIdx] = '' // 이거 안해도 된다
    } //
    else if (c === ')' || c === ']' || c === '}') {
      result = 'no'
      break
    }
  }

  if (stackIdx > 0) {
    result = 'no'
  }

  resultStr += result + '\n'
})

// 출력
process.stdout.write(resultStr)
