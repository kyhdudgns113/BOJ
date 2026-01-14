// 입력
var inputArr = require('fs')
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map(row =>
    row
      .trim()
      .split(' ')
      .map((val, idx) => [idx + 1, Number(val)])
  )

// 인덱스 변수 선언
var nowIdx = 0
var resultStr = ''

while (inputArr[0][0][1] > 0) {
  // 출력
  resultStr += inputArr[1][nowIdx][0] + ' '

  // 풍선 터뜨리기
  var val = inputArr[1][nowIdx][1]
  inputArr[1].splice(nowIdx, 1)

  inputArr[0][0][1] -= 1

  // 다음 풍선 인덱스 구하기
  nowIdx = (((nowIdx + (val > 0 ? val - 1 : val)) % inputArr[0][0][1]) + inputArr[0][0][1]) % inputArr[0][0][1]
}

process.stdout.write(resultStr)
