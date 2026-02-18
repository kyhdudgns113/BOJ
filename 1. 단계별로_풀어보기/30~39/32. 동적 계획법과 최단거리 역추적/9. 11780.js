// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split('\n')

// 입력 파싱
const N = +inputArr[0]
const M = +inputArr[1]
const busInfoArr = inputArr.slice(2).map(inputRow => inputRow.trim().split(' ').map(Number))

// resultArr[i][j]: i 부터 j 까지 가는 최단거리
// medianArr[i][j]: 그 때 들르는 중간지점
const resultArr = Array.from({length: N + 1}, () => Array.from({length: N + 1}).fill(10000001))
const medianArr = Array.from({length: N + 1}, () => Array.from({length: N + 1}).fill(-1))

// 버스정보 반영 (같은 구간 여러 버스 있으면 최소비용)
busInfoArr.forEach(busInfo => {
  const [start, end, cost] = busInfo
  resultArr[start][end] = Math.min(resultArr[start][end], cost)
  medianArr[start][end] = start
})

// 초기화
for (let i = 1; i <= N; i++) {
  resultArr[i][i] = 0
  medianArr[i][i] = i
}

// 플로이드-와샬 알고리즘 수행
for (let median = 1; median <= N; median++) {
  for (let start = 1; start <= N; start++) {
    for (let end = 1; end <= N; end++) {
      if (resultArr[start][end] > resultArr[start][median] + resultArr[median][end]) {
        resultArr[start][end] = resultArr[start][median] + resultArr[median][end]
        medianArr[start][end] = median
      }
    }
  }
}

// 출력 변수
let resultStr = ''

// 출력 1: 도시간 이동비용
for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    resultStr += (resultArr[i][j] > 10000000 ? 0 : resultArr[i][j]) + ' '
  }
  resultStr += '\n'
}

// 출력 2: 이동시 들르는 도시목록
for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    const getArr = getMedianArr(i, j)
    let tempStr = ''
    for (let k = 0; k < getArr.length; k++) {
      if (k === 0 || getArr[k] !== getArr[k - 1]) {
        tempStr += getArr[k] + ' '
      }
    }
    let len = tempStr.split(' ').length - 1
    if (len === 1) {
      resultStr += '0\n'
    } // ::
    else {
      resultStr += `${len} ${tempStr}\n`
    }
  }
}

process.stdout.write(resultStr)

function getMedianArr(start, end) {
  if (start === end || resultArr[start][end] > 10000000) {
    return [0]
  }

  const median = medianArr[start][end]

  if (median === start || median === end) {
    return [start, end]
  } // ::
  else {
    return [...getMedianArr(start, median), ...getMedianArr(median, end)]
  }
}
