// 입력
const fs = require('fs')
const input = fs.readFileSync('/dev/stdin').toString().trim()

const resultArr = Array.from({length: 26}, () => -1)

const baseVal = 'a'.charCodeAt(0)

for (let i = 0; i < input.length; i++) {
  // i 번째 문자가 몇 번째 알파벳인지 확인한다.
  const nowIdx = input.charCodeAt(i) - baseVal

  // 만약 등장한적 없다면 첫 등장이 언제인지 기록한다
  if (resultArr[nowIdx] === -1) {
    resultArr[nowIdx] = i
  }
}

resultArr.forEach(val => process.stdout.write(`${val} `))
