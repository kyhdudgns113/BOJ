// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, K] = inputArr[0].split(' ').map(Number)

// 거대한 배열 생성
const queueArr = Array.from({length: 1000001})
  .fill(0)
  .map((_, idx) => idx + 1)

// 인덱스
let headIdx = 0
let tailidx = N

// 출력할 문자열
let result = '<'

for (let i = 0; i < N; i++) {
  // K - 1 만큼 이동한다.
  for (let j = 0; j < K - 1; j++) {
    queueArr[tailidx++] = queueArr[headIdx++]
  }

  // 결과에 추가
  result += `${queueArr[headIdx++]}`
  if (i !== N - 1) {
    result += ', '
  }
}
result += '>'

// 출력
process.stdout.write(result)
