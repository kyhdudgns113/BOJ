// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const [N, M] = inputArr[0].trim().split(' ').map(Number)
const ladder = inputArr.slice(1, N + 1).map(row => row.trim().split(' ').map(Number))
const snake = inputArr.slice(N + 1).map(row => row.trim().split(' ').map(Number))

/**
 * 각 칸의 정보를 저장
 *   - 빈칸이면 본인 숫자
 *   - 뱀이나 사다리면 이동하는 칸의 숫자
 */
const blockInfo = Array.from({length: 101}).map((_, idx) => idx)

// 사다리들의 정보 기입
ladder.forEach(ladder => {
  const [start, end] = ladder
  blockInfo[start] = end
})

// 뱀의 정보 기입
snake.forEach(snake => {
  const [start, end] = snake
  blockInfo[start] = end
})

// 주사위 몇 번 만에 갈 수 있는지 저장하는 배열
// 방문한적 없거나 하면 -1 을 저장한다.
const isVisit = Array.from({length: 101}).fill(-1)

// BFS 용 방문큐를 배열로 구현한다.
const visitQueue = Array.from({length: 101}).fill(null)
let nowIdx = 0
let insertIdx = 0

// 시작지점을 방문큐에 넣는다.
visitQueue[insertIdx++] = 1
isVisit[1] = 0

// BFS 연산
while (nowIdx < insertIdx) {
  const now = visitQueue[nowIdx++]
  const nowVal = isVisit[now]

  // 주사위 값마다 BFS 큐에 넣을지 확인한다.
  for (let i = 1; i <= 6 && now + i <= 100; i++) {
    const next = now + i
    if (isVisit[next] === -1) {
      isVisit[next] = nowVal + 1

      // 사다리나 뱀이면 이동한 값을 BFS 큐에 넣을지 봐야한다.
      const realNext = blockInfo[next]
      if (realNext !== next) {
        // 사다리나 뱀이고, 방문한적 없으면 큐에 넣는다.
        if (isVisit[realNext] === -1) {
          isVisit[realNext] = nowVal + 1
          visitQueue[insertIdx++] = realNext
        }
      } // ::
      else {
        // 사다리나 뱀이 아니면 현재 칸을 큐에 넣어야 한다.
        visitQueue[insertIdx++] = next
      }
    }
  }
}

// 출력
process.stdout.write(`${isVisit[100]}`)
