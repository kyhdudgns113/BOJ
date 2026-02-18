// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const A = inputArr[1].trim().split(' ').map(Number)

/**
 * tempArr
 * - LIS 를 만들기 위해 임시로 저장하는 배열
 * - 새로운 숫자가 들어오면 이분탐색으로 tempArr 에 들어갈곳을 찾는다.
 * - 만약 들어갈곳이 tempArr 맨 뒤라면 원소를 추가한다.
 *     + 이 때의 tempArr 가 현재 원소까지의 LIS 이다.
 * - 아니면 해당 위치의 원소를 갱신한다.
 * - Node 는 배열 삽입 연산만 한다면 항상 O(N) 은 아니기 때문에 이렇게 초기화해도 무방하다.
 *
 * tempArr[i] = [A[k], k] 이다.
 */
const tempArr = []

/**
 * prevIdxArr[i]
 * - i 번쨰 원소 좌측에 있는 숫자중에서, 가장 오른쪽에 있는 i 번째 원소보다 작은 수의 인덱스
 * - 역추적에 사용된다.
 * - 초기값을 -1로 하여, while 문에서 이를 만나면 종료하도록 한다.
 */
const prevIdxArr = Array.from({length: N}).fill(-1)

// tempArr 에 초기값을 넣는다.
// 0번째 원소는 무조건 들어가게 된다.
tempArr.push([A[0], 0])

// 1번째 원소부터 tempArr 에 들어갈곳을 찾는다.
for (let i = 1; i < N; i++) {
  const val = A[i]

  const insertIdx = binarySearch(val, 0, tempArr.length - 1)

  // 만약 배열안에 있는 값들보다 더 크면 그대로 삽입한다.
  if (insertIdx === tempArr.length) {
    const lastElemIdx = tempArr[insertIdx - 1][1]

    tempArr.push([A[i], i])
    prevIdxArr[i] = lastElemIdx
  } // ::
  else {
    tempArr[insertIdx] = [A[i], i]
    if (insertIdx > 0) {
      prevIdxArr[i] = tempArr[insertIdx - 1][1]
    } // ::
    else {
      prevIdxArr[i] = -1
    }
  }
}

// 출력할 결과가 담길 배열. 처음에는 역순으로 들어간다.
const resultArr = []
let nowIdx = tempArr[tempArr.length - 1][1]

while (nowIdx !== -1) {
  resultArr.push(A[nowIdx])
  nowIdx = prevIdxArr[nowIdx]
}

resultArr.reverse()

process.stdout.write(`${resultArr.length}\n`)
process.stdout.write(`${resultArr.join(' ')}`)

// val 보다 작은 값중 가장 큰 값의 다음 인덱스를 리턴해야 한다.
function binarySearch(val, left, right) {
  if (left === right) {
    if (tempArr[left][0] < val) {
      return left + 1
    } // ::
    else {
      return left
    }
  }

  const mid = Math.floor((left + right) / 2)
  const midVal = tempArr[mid][0]

  if (val === midVal) {
    // 이미 같은 값인경우가 나왔으므로 갱신할 장소를 더 찾을 필요가 없다.
    return mid
  } // ::
  else if (midVal < val) {
    // 나보다 작은 값의 인덱스가 나와선 안된다.
    return binarySearch(val, mid + 1, right)
  } // ::
  else {
    // mid - 1 의 값이 val 보다 작을수도 있다.
    // 그러면 mid 를 리턴해야 한다.
    // mid 가 가능하므로 범위에 포함시킨다.
    return binarySearch(val, left, mid)
  }
}
