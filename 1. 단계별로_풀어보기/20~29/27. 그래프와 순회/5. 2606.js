// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const M = +inputArr[1]
const pairArr = inputArr.slice(2).map(row => row.trim().split(' ').map(Number))

// 연결 정보 저장
const mapArr = Array.from({length: N + 1}, () => {
  return {}
})
pairArr.forEach(ab => {
  const [a, b] = ab
  mapArr[a][b] = 1
  mapArr[b][a] = 1
})

const connArr = Array.from({length: N + 1}, () => [])
mapArr.forEach((maps, mapIdx) => {
  connArr[mapIdx] = Object.keys(maps)
})

// 감염여부 저장 배열
const isInfected = Array.from({length: N + 1}).fill(false)

isInfected[1] = true

// 감염 시작
dfs(1)

// 결과 변수
let result = isInfected.filter(val => val).length - 1

// 출력
process.stdout.write(`${result}`)

function dfs(now) {
  connArr[now].forEach(next => {
    if (isInfected[next] === false) {
      isInfected[next] = true
      dfs(next)
    }
  })
}
