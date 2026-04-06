// 입력
const fs = require('fs')
const inputArr = fs
  .readFileSync(0)
  .toString()
  .trim()
  .split('\n')
  .map(row => row.trim())

// 입력 파싱
const N = +inputArr[0]
const peopleArr = inputArr[1].split(' ').map(Number)
const treeInfoArr = inputArr.slice(2).map(row => row.split(' ').map(Number))

const connInfoArr = Array.from({length: N + 1}, () => [])
const parentArr = Array.from({length: N + 1}).fill(-1)

const ROOT_NODE = 1

// 트리 연결정보 생성
treeInfoArr.forEach(info => {
  const [U, V] = info
  connInfoArr[U].push(V)
  connInfoArr[V].push(U)
})

parentArr[ROOT_NODE] = 0
const [k0, k1, k2] = DFS(ROOT_NODE)

process.stdout.write(`${Math.max(k0, k1, k2)}`)

function DFS(now) {
  /**
   * k0Arr: 자식노드가 선정되었을때의 최대인원의 배열
   * k1Arr: 자식노드가 1번연속 선정되지 못한 마을일때 최대인원의 배열
   * k2Arr: 자식노드가 2번연속 선정되지 못한 마을일때 최대인원의 배열
   */
  const k0Arr = []
  const k1Arr = []
  const k2Arr = []

  connInfoArr[now].forEach(next => {
    if (parentArr[next] === -1) {
      parentArr[next] = now
      const [k0, k1, k2] = DFS(next)

      k0Arr.push(k0)
      k1Arr.push(k1)
      k2Arr.push(k2)
    }
  })

  /**
   * 영역 1: nowK1 구하는곳.
   *
   * - 현재 미선정, 부모노드 미선정이어도 됨.
   * - 자식노드는 선정되었거나 1번연속 미선정이어야 함.
   *     + 자식이 2연속 미선정이면 현재노드는 무조건 선정되어야 함
   * - 자식노드중 최소 1개는 선정되어야함
   *
   */
  let nowK1 = 0
  let hasK0 = false
  for (let i = 0; i < k0Arr.length; i++) {
    nowK1 += Math.max(k0Arr[i], k1Arr[i])
    if (k0Arr[i] >= k1Arr[i]) hasK0 = true
  }
  if (!hasK0 && k0Arr.length > 0) {
    let maxDelta = -1000000000
    for (let i = 0; i < k0Arr.length; i++) {
      maxDelta = Math.max(maxDelta, k0Arr[i] - k1Arr[i])
    }
    nowK1 += maxDelta
  }

  /**
   * 영역 2: nowK2 구하는곳.
   *
   * - 현재 미선정, 부모노드 선정이어야 함.
   * - 자식노드는 선정되었거나 1번연속 미선정이어야 함.
   *     + 자식이 2연속 미선정이면 현재 노드는 무조건 선정되어야 함
   * - 자식노드중 최소 1개는 미선정이어야 함
   *     + 그래야 현재 노드가 2연속 미선정이 됨.
   */
  let nowK2 = 0
  for (let i = 0; i < k1Arr.length; i++) {
    nowK2 += k1Arr[i]
  }

  // 영역 3: nowK0 구하는곳. 현재 선정.
  // 자식노드는 전부 미선정이어야 함
  let nowK0 = peopleArr[now - 1]
  for (let i = 0; i < k1Arr.length; i++) {
    const k1 = k1Arr[i]
    const k2 = k2Arr[i]
    nowK0 += Math.max(k1, k2)
  }

  return [nowK0, nowK1, nowK2]
}
