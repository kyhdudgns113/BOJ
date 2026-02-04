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
      const rankArr = inputArr[rowIdx + 2].trim().split(' ').map(Number)
      const M = +inputArr[rowIdx + 3]
      const changeArr = inputArr.slice(rowIdx + 4, rowIdx + 4 + M).map(row => row.trim().split(' ').map(Number))
      remain = M + 2
      return [N, rankArr, M, changeArr]
    } // ::
    else {
      remain--
      return null
    }
  })
  .filter(val => val !== null)

// 쿼리마다 연산 수행
queryArr.forEach(query => {
  const [N, rankArr, M, changeArr] = query

  // remainFrontArr[i] : 남아있는 사람중 i 보다 앞에있는 사람의 수
  const remainFrontArr = Array.from({length: N + 1}).fill(0)

  // mapArr[i]: i 보다 뒤에 있던 사람들의 목록
  const mapArr = Array.from({length: N + 1}, () => {
    return {}
  })
  for (let i = 0; i < N; i++) {
    const now = rankArr[i]
    remainFrontArr[now] = i
    for (let j = i + 1; j < N; j++) {
      const next = rankArr[j]
      mapArr[now][next] = 1
    }
  }

  // 랭킹이 바뀐것을 반영한다.
  changeArr.forEach(changeInfo => {
    const [a, b] = changeInfo

    if (mapArr[a][b] === 1) {
      // a 가 b 앞에 있었다가 순서가 바뀐 경우
      mapArr[a][b] = 0
      mapArr[b][a] = 1
      remainFrontArr[a]++
      remainFrontArr[b]--
    } // ::
    else {
      // b 가 a 앞에 있었다가 순서가 바뀐 경우
      mapArr[a][b] = 1
      mapArr[b][a] = 0
      remainFrontArr[a]--
      remainFrontArr[b]++
    }
  })

  // backListArr[i]: i 보다 뒤에 있는 사람들의 목록
  const backListArr = mapArr.map(mapInfo => Object.keys(mapInfo).filter(key => mapInfo[key] === 1))

  // isVisit[i]: i 의 최종 순위. 정해지지 않았으면 0
  // newRankArr[i]: 최종적으로 i 등인 사람의 번호.
  const isVisit = Array.from({length: N + 1}).fill(0)
  const newRankArr = Array.from({length: N}).fill(0)

  // 방문큐. 배열로 구현했다.
  const visitQueue = Array.from({length: N + 1}).fill(0)
  let nowIdx = 0
  let insertIdx = 0

  remainFrontArr.forEach((val, idx) => {
    if (val === 0 && idx > 0) {
      visitQueue[insertIdx++] = idx
      isVisit[idx] = 1
    }
  })

  // 랭킹을 한 명씩 차례대로 넣는다
  while (nowIdx < insertIdx) {
    const nowPeople = visitQueue[nowIdx]
    newRankArr[nowIdx++] = nowPeople
    isVisit[nowPeople] = nowIdx

    // nowPeople 을 완료했으니 이를 목록에서 제거한걸 반영한다.
    for (let i = 0; i < backListArr[nowPeople].length; i++) {
      const nextPeople = backListArr[nowPeople][i]
      // 만약 다음 사람의 랭킹이 이미 정해졌었다면 루프를 돌고있는 것이다.
      // 이는 발생할 수 없다.
      if (isVisit[nextPeople] !== 0) {
        process.stdout.write('IMPOSSIBLE\n')
        return
      }

      remainFrontArr[nextPeople]--

      if (remainFrontArr[nextPeople] === 0) {
        visitQueue[insertIdx++] = nextPeople
      }
    }

    /**
     * 방문큐에 사람이 2명이상 남았다는것 = 본인보다 앞선 사람이 없는 경우가 2개 이상이라는것
     * 이는 다음 순위가 확실하지 않다는 뜻이다.
     */
    if (nowIdx + 1 < insertIdx) {
      process.stdout.write('?\n')
      return
    }
  }

  // 아직 랭킹이 정해지지 않은 사람이 있다면 그 사람들끼리 루프를 돌고있는것이다.
  // 이는 데이터에 일관성이 없다는 뜻이다.
  const numRemainPeople = isVisit.filter(val => val === 0).length
  if (numRemainPeople > 1) {
    process.stdout.write('IMPOSSIBLE\n')
    return
  }

  // 모든 에러상황을 통과했으면 순위를 출력한다.
  process.stdout.write(`${newRankArr.join(' ')}\n`)
})
