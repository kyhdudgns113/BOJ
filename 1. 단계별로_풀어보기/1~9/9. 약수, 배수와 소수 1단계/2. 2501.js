// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 입력 파싱
const [N, K] = inputArr[0].split(' ').map(Number)

// 약수를 담을 배열
const factorArr = []

// 약수들을 찾아서 배열에 삽입

for (let i = 1; i <= N; i++) {
  if (N % i === 0) {
    factorArr.push(i)
  }
}

if (factorArr.length < K) {
  process.stdout.write('0')
} else {
  process.stdout.write(`${factorArr[K - 1]}`)
}
