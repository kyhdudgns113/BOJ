// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, K] = inputArr[0].trim().split(' ').map(Number)
const tempArr = inputArr[1].trim().split(' ').map(Number)

// 결과 저장할 배열
// reusltArr[n] : n 번째 인덱스까지 K 개의 합
const minVal = -10000001
const resultArr = Array.from({length: N}).fill(minVal)

// 초기값: 0부터 K 개의 합
resultArr[K - 1] = tempArr.slice(0, K).reduce((prev, val) => (prev += val), 0)

// 인덱스를 이동해가며 resultArr 값 구하기
for (let k = K; k < N; k++) {
  resultArr[k] = resultArr[k - 1] - tempArr[k - K] + tempArr[k]
}

// 결과 구하기
const result = Math.max(...resultArr)

// 출력
process.stdout.write(`${result}`)
