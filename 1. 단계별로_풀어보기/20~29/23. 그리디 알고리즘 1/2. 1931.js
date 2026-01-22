// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const confArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// 끝나는 시간이 빠른것부터 정렬
confArr.sort((a, b) => {
  if (a[1] !== b[1]) {
    return a[1] - b[1]
  } // ::
  else {
    // 끝나는 시간이 같다면 시작 시간이 늦는것을 앞으로
    b[0] - a[0]
  }
})

// 마지막 회의의 시작시간과 종료시간
let lastStart = -1
let lastEnd = -1

// 결과 변수
let result = 0

// 회의 목록을 순회하며 배치될 수 있는 회의를 센다
for (let confIdx = 0; confIdx < N; confIdx++) {
  const [nowStart, nowEnd] = confArr[confIdx]

  // 현재 회의의 시작시간이 마지막 회의의 종료시간 이후인가?
  const isOver = lastEnd <= nowStart

  // 마지막 회의가 시작과 동시에 끝나는가?
  // 마지막 화의가 7 7 이고, 현재 회의가 5 7 인 경우
  const isLastSame = lastEnd === nowEnd && lastStart === lastEnd

  if (isOver || isLastSame) {
    result++
    lastStart = nowStart
    lastEnd = nowEnd
  }
}

// 출력
process.stdout.write(`${result}`)
