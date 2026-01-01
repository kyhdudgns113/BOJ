// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0, 'utf-8').toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const axisArr = inputArr.slice(1)

// 흰 종이 영역 배열 생성 (100 x 100)
const whiteArea = Array.from({length: 100})
  .fill(null)
  .map(() => Array.from({length: 100}).fill(0))

// 검은 종이 좌표마다 흰색종이 채우기
axisArr.forEach(axis => {
  // 좌표 파싱
  const [X, Y] = axis.trim().split(' ').map(Number)

  // 흰 종이 범위를 벗어나서 붗여지지 않기 위함
  const maxX = Math.min(100, X + 10)
  const maxY = Math.min(100, Y + 10)

  // 현재 종이 부착
  for (let x = X; x < maxX; x++) {
    for (let y = Y; y < maxY; y++) {
      whiteArea[x][y] = 1
    }
  }
})

// 붙여진 영역 계산
const result = whiteArea.reduce((acc, row) => (acc += row.reduce((acc, val) => (acc += val), 0)), 0)

// 출력
process.stdout.write(`${result}`)
