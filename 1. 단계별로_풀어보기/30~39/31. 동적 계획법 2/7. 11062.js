// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
let remain = 0
const T = +inputArr[0]
const queryArr = inputArr
  .slice(1)
  .map((inputRow, rowIdx) => {
    if (remain === 0) {
      const N = +inputArr[rowIdx + 1]
      const cardArr = inputArr[rowIdx + 2].trim().split(' ').map(Number)
      remain = 1
      return [N, cardArr]
    } // ::
    else {
      remain--
      return null
    }
  })
  .filter(block => block !== null)

// 쿼리마다 연산 수행
queryArr.forEach(query => {
  const [N, cardArr] = query

  // 카드의 구간합을 구하기 위한 누적합 배열
  const accArr = Array.from({length: N + 1}).fill(0)
  for (let i = 1; i <= N; i++) {
    accArr[i] = accArr[i - 1] + cardArr[i - 1]
  }

  // 어떤 사람이 특정 구간을 접했을때 얻을 수 있는 최대점수
  // resultArr[start][end] : start 부터 end 까지 카드가 남았을때, 얻을 수 있는 점수의 최대값
  const resultArr = Array.from({length: N}, () => Array.from({length: N}).fill(0))

  // resultArr 의 초기조건을 넣어준다.
  for (let i = 0; i < N; i++) {
    resultArr[i][i] = cardArr[i]
  }

  /**
   * Bottom-UP 연산을 수행한다.
   *
   * 특정 구간의 길이에 대해서, 각 시작점마다 어느 카드를 가지고 오는게 이득인지 연산해나간다.
   */
  for (let len = 2; len <= N; len++) {
    for (let start = 0; start + len - 1 <= N - 1; start++) {
      const end = start + len - 1
      const rangeSum = accArr[end + 1] - accArr[start]

      resultArr[start][end] = Math.max(
        // ::
        rangeSum - resultArr[start][end - 1],
        rangeSum - resultArr[start + 1][end]
      )
    }
  }

  // 출력
  process.stdout.write(`${resultArr[0][N - 1]}\n`)
})
