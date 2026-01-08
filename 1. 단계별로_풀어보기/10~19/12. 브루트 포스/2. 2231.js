// 입력
const inputArr = require('fs').readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]

for (let result = 0; result <= N; result++) {
  const numArr = result.toString().split('').map(Number)

  let temp = result

  numArr.forEach(num => {
    temp += num
  })

  if (temp === N) {
    process.stdout.write(`${result}`)
    return
  }
}

process.stdout.write('0')
