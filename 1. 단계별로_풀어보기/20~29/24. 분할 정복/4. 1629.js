// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [A, B, C] = inputArr[0].split(' ').map(BigInt)

// 거듭제곱별 나머지 저장하는 배열
const modArr = Array.from({length: 33}).fill(0n)
modArr[0] = A % C


// 거듭제곱별 나머지 배열 채우기
for (let i = 1; i < 33; i++) {
  modArr[i] = (modArr[i - 1] * modArr[i - 1]) % C
}
 
let result = 1n

let remain = B
let idx = 0

while (remain > 0n) {
  // 가장 낮은 비트갑을 구한다.
  const mul = remain & 1n
  
  if (mul) {
    result = (result * modArr[idx]) % C
  }

  remain = remain >> 1n
  idx++
}

process.stdout.write(`${result}`)
 