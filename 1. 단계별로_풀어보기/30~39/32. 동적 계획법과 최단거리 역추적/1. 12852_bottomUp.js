// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

// resultArr[i]: i 를 만들기 위한 최소한의 연산량
// 그 어떠한 경우에도 연산량이 N 이 되지는 않기에 초기값으로 설정한다.
const resultArr = Array.from({length: N + 1}).fill(N)
resultArr[1] = 0 // 초기값.

// prevArr[i]: 최소한의 연산으로 i 를 만들때 i 이전의 값
// 본인과 이 값이 같을때까지 출력하게 할 의도다.
const prevArr = Array.from({length: N + 1}).fill(1)

// Bottom-Up 연산 수행
for (let now = 1; now < N; now++) {
  const nowRes = resultArr[now]

  if (nowRes + 1 < resultArr[now + 1]) {
    resultArr[now + 1] = nowRes + 1
    prevArr[now + 1] = now
  }

  if (2 * now <= N && nowRes + 1 < resultArr[2 * now]) {
    resultArr[2 * now] = nowRes + 1
    prevArr[2 * now] = now
  }

  if (3 * now <= N && nowRes + 1 < resultArr[3 * now]) {
    resultArr[3 * now] = nowRes + 1
    prevArr[3 * now] = now
  }
}

// 결과 출력
let now = N

process.stdout.write(`${resultArr[N]}\n`)

while (true) {
  process.stdout.write(`${now} `)

  if (now === prevArr[now]) {
    break
  }

  now = prevArr[now]
}
