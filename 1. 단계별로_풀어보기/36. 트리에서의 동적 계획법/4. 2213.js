// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const WArr = inputArr[1].trim().split(' ').map(Number)
const UVArr = inputArr.slice(2).map(row => row.trim().split(' ').map(Number))

const connInfoArr = Array.from({length: N + 1}, () => [])
UVArr.forEach(([u, v]) => {
  connInfoArr[u].push(v)
  connInfoArr[v].push(u)
})
const parentArr = Array.from({length: N + 1}).fill(-1)

const ROOT_NODE = 1
parentArr[ROOT_NODE] = 0

const [k0, k1, k2] = DFS(ROOT_NODE)

if (k1[0] <= k0[0] && k2[0] <= k0[0]) {
  k0[1].sort((a, b) => a - b)
  process.stdout.write(`${k0[0]}\n`)
  process.stdout.write(`${k0[1].join(' ')}`)
} else if (k0[0] <= k1[0] && k2[0] <= k1[0]) {
  k1[1].sort((a, b) => a - b)
  process.stdout.write(`${k1[0]}\n`)
  process.stdout.write(`${k1[1].join(' ')}`)
} else {
  k2[1].sort((a, b) => a - b)
  process.stdout.write(`${k2[0]}\n`)
  process.stdout.write(`${k2[1].join(' ')}`)
}

function DFS(now) {
  const k0Map = {}
  const k1Map = {}
  const k2Map = {}

  connInfoArr[now].forEach(next => {
    if (parentArr[next] === -1) {
      parentArr[next] = now
      const [k0, k1, k2] = DFS(next)
      k0Map[next] = k0
      k1Map[next] = k1
      k2Map[next] = k2
    }
  })

  let nowK0Val = WArr[now - 1]
  let nowK1Val = 0
  let nowK2Val = 0

  const nowK0ArrMap = {}
  const nowK1ArrMap = {}
  const nowK2ArrMap = {}

  let hasK0 = false

  // 자식 노드들이 값으로 현재 노드값 계산 및 배열 설정
  Object.keys(k0Map).forEach(child => {
    const k0Val = k0Map[child][0]
    const k1Val = k1Map[child][0]
    const k2Val = k2Map[child][0]

    const k0Arr = k0Map[child][1]
    const k1Arr = k1Map[child][1]
    const k2Arr = k2Map[child][1]

    // nowK0_ArrMap 설정
    if (k1Val > k2Val) {
      nowK0ArrMap[child] = k1Arr
    } // ::
    else {
      nowK0ArrMap[child] = k2Arr
    }

    // nowK1_ArrMap 설정
    if (k0Val >= k1Val) {
      hasK0 = true
      nowK1ArrMap[child] = k0Arr
    } // ::
    else {
      nowK1ArrMap[child] = k1Arr
    }

    // nowK2_ArrMap 설정
    nowK2ArrMap[child] = k1Arr

    nowK0Val += Math.max(k1Map[child][0], k2Map[child][0])
    nowK1Val += Math.max(k0Map[child][0], k1Map[child][0])
    nowK2Val += k1Map[child][0]
  })

  // K1 구할때, 자식중 K0 가 선정되지 않은 경우
  if (!hasK0 && Object.keys(k0Map).length > 0) {
    let maxDelta = -200000000
    let whichChild = -1

    Object.keys(k1Map).forEach(child => {
      const k0Val = k0Map[child][0]
      const k1Val = k1Map[child][0]

      if (maxDelta < k0Val - k1Val) {
        maxDelta = k0Val - k1Val
        whichChild = child
      }
    })

    nowK1Val += maxDelta
    nowK1ArrMap[whichChild] = k0Map[whichChild][1]
  }

  const nowK0 = [nowK0Val, [now, ...Object.values(nowK0ArrMap).flat()]]
  const nowK1 = [nowK1Val, Object.values(nowK1ArrMap).flat()]
  const nowK2 = [nowK2Val, Object.values(nowK2ArrMap).flat()]

  return [nowK0, nowK1, nowK2]
}
