// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 입력 파싱
S = inputArr[0].trim().split('')

const lenS = S.length

const croat2Arr = ['c=', 'c-', 'd-', 'lj', 'nj', 's=', 'z=']

let result = 0

for (let i = 0; i < lenS; i++) {
  if (i + 1 < lenS) {
    const word2 = [S[i], S[i + 1]].join('')
    if (croat2Arr.includes(word2)) {
      i++
    } else if (i + 2 < lenS && [S[i], S[i + 1], S[i + 2]].join('') === 'dz=') {
      i += 2
    }
  }
  result += 1
}

process.stdout.write(`${result}`)
