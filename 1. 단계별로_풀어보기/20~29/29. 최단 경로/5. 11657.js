// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].trim().split(' ').map(Number)
const ABCArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// distArr[i] : 시작도시에서 i 번 도시까지 최단거리
// 이론상 최대값인 500만보다 1 더 큰 수를 초기값으로 설정했다.
const distArr = Array.from({length: N + 1}).fill(5000001)

// 벨만포드 알고리즘을 수행하고, 무한루프가 있는지 결과를 받는다.
const isInfinity = bellmanFord(1)

if (isInfinity) {
  process.stdout.write('-1')
} // ::
else {
  // 출력변수. 출력함수 호출횟수를 최소화하기 위함
  let resultStr = ''

  distArr.slice(2).forEach(dist => {
    if (dist < 5000001) {
      resultStr += dist + '\n'
    } // ::
    else {
      resultStr += '-1\n'
    }
  })

  process.stdout.write(resultStr)
}

function bellmanFord(start) {
  distArr[start] = 0

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const [A, B, C] = ABCArr[j]

      if (distArr[A] !== 5000001 && distArr[A] + C < distArr[B]) {
        if (i === N - 1) {
          return true
        }

        distArr[B] = distArr[A] + C
      }
    }
  }

  return false
}
