// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 입력 파싱
const wordArr = inputArr.slice(1)

// 단어마다 그룹 단어인지 확인
let result = wordArr.length

wordArr.forEach(word => {
  // 문자열(단어)를 문자의 배열로 변환
  const charArr = word.trim().split('')

  // 단어마다 등장횟수 배열
  const cntArr = Array.from({length: 26}).fill(0)

  // 단어를 순회하며 그룹 단어가 아닌것을 검출
  for (const [charIdx, char] of charArr.entries()) {
    const cntIdx = char.charCodeAt(0) - 'a'.charCodeAt(0)

    // 해당 문자가 이미 등장했는가
    const isAlreadyExist = cntArr[cntIdx] > 0

    // 이전 문자랑 다른 문자인가?
    const isDifferent = charIdx > 0 && charArr[charIdx - 1] !== char

    // 그룹 단어가 아닌것마다 1을 뺀다
    if (isAlreadyExist && isDifferent) {
      result -= 1
      break
    }

    cntArr[cntIdx] += 1
  }
})

process.stdout.write(`${result}`)
