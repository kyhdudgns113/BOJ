// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf8').toString().trim().split('\n')

// 입력 파싱
const T = +inputArr[0] // parseInt 보다 이게 더 빠르다. 안 써도 되긴 한다.
const testCases = inputArr.slice(1)

// 테스트 케이스마다 작업 수행
testCases.forEach(input => {
  // 마지막은 비어있을 수 있는 경우는 고려하지 않아도 된다.
  // trim() 으로 제거했다.
  // if (!input) return

  // 입력을 둘로 나눈다.
  let [R, S] = input.split(' ')

  // 반복횟수 R 을 숫자로 변환한다.
  R = +R // parseInt 보다 이게 더 빠르다고 한다.

  let resultCase = ''

  for (let i = 0; i < S.length; i++) {
    const c = S.charAt(i)
    resultCase += c.repeat(R)
  }

  process.stdout.write(`${resultCase}\n`)
})
