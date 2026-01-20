// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const wineArr = inputArr.slice(1).map(Number)

// 결과 저장할 배열
// resultArr[now][skip]: now 번째 와인을 먹기 직전에 스킵을 했는지 여부에 따른 섭취량의 최대값
//   - 3잔 이상을 스킵하는건 고려할 필요 없다.
//     - 그 중간에 잔을 마셔야만 최대치로 섭취할 수 있다.
//   - 1잔을 스킵한거랑 2잔을 스킵한거랑 구분할 필요가 없다.
//     - 몇잔을 스킵했던간에 이번잔과 다음잔을 같이 마실 수 있다는 사실은 변하지 않는다.
const resultArr = Array.from({length: N + 1}, () => Array.from({length: 2}, () => 0))

// 초기값 연산 (0, 과 1 이전에 와인을 마시지 않은 경우만 초기값으로 고려한다)
resultArr[0][1] = wineArr[0]
if (N > 1) {
  resultArr[1][1] = wineArr[1]
}

// Bottom-Up 연산
for (let now = 0; now < N - 1; now++) {
  // now + 1 번째 와인을 마시는 경우
  resultArr[now + 1][0] = Math.max(resultArr[now][1] + wineArr[now + 1], resultArr[now + 1][0])

  // now 번째 와인을 마시는 모든 경우중 최대값
  const nowMax = Math.max(...resultArr[now])

  // now + 2 번째 와인을 마시는 경우
  if (now + 2 < N) {
    resultArr[now + 2][1] = Math.max(nowMax + wineArr[now + 2], resultArr[now + 2][1])
  }
  // now + 3 번째 와인을 마시는 경우
  if (now + 3 < N) {
    resultArr[now + 3][1] = Math.max(nowMax + wineArr[now + 3], resultArr[now + 3][1])
  }
}

// 결과 구하기
// * N - 1 번째 와인을 마신 2가지 경우
// * N - 2 번째 와인을 이전것과 같이 마신 경우
// 위 3가지 경우중 최대값만 구하면 된다.
const result = Math.max(resultArr[N - 1][0], resultArr[N - 1][1], N >= 2 ? resultArr[N - 2][0] : 0)

// 출력
process.stdout.write(`${result}`)
