// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const rcArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 결과 배열
const resultArr = Array.from({length: N}, () => Array.from({length: N}).fill(0x7fffffff))

// 초기조건: 행렬 1개는 곱셉연산을 할 수 없다.
for (let i = 0; i < N; i++) {
  resultArr[i][i] = 0
}

// 구간의 길이가 2인것부터 Bottom-Up 연산을 한다.
for (let len = 2; len <= N; len++) {
  for (let start = 0; start + len - 1 < N; start++) {
    const end = start + len - 1

    for (let mid = start; mid < end; mid++) {
      resultArr[start][end] = Math.min(
        resultArr[start][end],
        resultArr[start][mid] + resultArr[mid + 1][end] + rcArr[start][0] * rcArr[mid][1] * rcArr[end][1]
      )
    }
  }
}

// 결과 출력
process.stdout.write(`${resultArr[0][N - 1]}`)
