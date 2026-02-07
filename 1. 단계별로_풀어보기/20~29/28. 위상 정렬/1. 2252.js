// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].trim().split(' ').map(Number)
const seqArr = inputArr.slice(1).map(row => row.trim().split(' ').map(Number))

// remainArr[i] : i 보다 앞에 있는 사람중 남은 사람의 수
const remainArr = Array.from({length: N + 1}).fill(0)
const mapArr = Array.from({length: N + 1}, () => {
  return {}
})
seqArr.forEach(seq => {
  const [A, B] = seq
  mapArr[A][B] = 1
  remainArr[B]++
})

// nextArr[i]: i 보다 뒤에 있는 사람의 목록
const nextArr = mapArr.map((mapInfo, mapIdx) => Object.keys(mapInfo))

// 방문큐. 배열로 선언한다.
const visitQueue = Array.from({length: 32001}).fill(0)
let nowIdx = 0
let insertIdx = 0

// 본인보다 확실하게 앞에 있는 사람은 없는 사람들을 방문큐에 넣는다.
for (let people = 1; people <= N; people++) {
  if (remainArr[people] === 0) {
    visitQueue[insertIdx++] = people
  }
}

// 출력 변수
let result = ''

// 위상정렬을 수행한다.
while (nowIdx < insertIdx) {
  const now = visitQueue[nowIdx++]
  result += now + ' '

  // now 보다 뒤에있는게 확실한 사람들의 remainArr 값을 1 줄인다.
  nextArr[now].forEach(next => {
    remainArr[next]--

    // 만약, next 보다 확실하게 큰 사람이 0명이 된 경우
    // 방문큐에 넣는다.
    if (remainArr[next] === 0) {
      visitQueue[insertIdx++] = next
    }
  })
}

// 출력
process.stdout.write(result)
