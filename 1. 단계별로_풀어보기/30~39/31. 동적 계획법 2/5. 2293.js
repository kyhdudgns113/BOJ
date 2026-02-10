// 입력
const inputArr = require('fs').readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, K] = inputArr[0].trim().split(' ').map(Number)

// resultArr[c] : c 를 만들 수 있는 경우의 수
const resultArr = Array.from({length: K + 1}).fill(0)

// 초기조건: 동전을 아예 안쓰고 0원을 만드는 방법은 1개가 있다. 아예 안쓰는것
resultArr[0] = 1

for (let i = 0; i < N; i++) {
  const coin = +inputArr[i + 1]
  for (let c = 0; c + coin <= K; c++) {
    resultArr[c + coin] += resultArr[c]
  }
}

// 결과 출력
process.stdout.write(`${resultArr[K]}`)
