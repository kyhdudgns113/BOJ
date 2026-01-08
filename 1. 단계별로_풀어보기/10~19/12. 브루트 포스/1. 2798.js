// 입력
const inputArr = require('fs').readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].split(' ').map(Number)
const cardArr = inputArr[1].split(' ').map(Number)

// 결과값 담을 변수
let result = 0

// 연산
for (let i = 0; i < N; i++) {
  const card0 = cardArr[i] // 성능 최적화: 메모리 참조 연산 줄이기

  for (let j = i + 1; j < N; j++) {
    const card1 = cardArr[j] // 성능 최적화: 메모리 참조 연산 줄이기

    for (let k = j + 1; k < N; k++) {
      const sumCard = card0 + card1 + cardArr[k] // 가독성 위한 변수 선언

      if (sumCard <= M) {
        result = Math.max(result, sumCard)
      }
    }
  }
}

// 출력
process.stdout.write(`${result}`)
