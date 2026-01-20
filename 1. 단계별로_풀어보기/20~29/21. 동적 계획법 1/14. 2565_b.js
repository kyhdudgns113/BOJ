// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const mapArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// mapArr 정렬
mapArr.sort((a, b) => a[0] - b[0])

// 결과 배열
const resultArr = Array.from({length: N}).fill(1)

// Bottom-Up 연산
for (let now = 1; now < N; now++) {
  for (let prev = 0; prev < now; prev++) {
    if (mapArr[prev][1] < mapArr[now][1]) {
      resultArr[now] = Math.max(resultArr[now], resultArr[prev] + 1)
    }
  }
}

// 결과 계산
const result = N - Math.max(...resultArr)

// 출력
process.stdout.write(`${result}`)