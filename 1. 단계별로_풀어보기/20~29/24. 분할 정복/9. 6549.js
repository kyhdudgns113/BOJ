// 입력
const fs = require('fs')
const inputArr = fs.readFileSync(0).toString().trim().split("\n")

// 입력 파싱
const testArr = inputArr.map(row => row.trim().split(' ').map(BigInt))

// 출력 변수
let resultStr = ''

testArr.forEach(test => {
  if (test.length === 1) return

  const H = test.slice(1)

  resultStr += getMaxArea(H, 0n, BigInt(H.length - 1)) + '\n'
})

// 결과 출력
process.stdout.write(resultStr)

function getMaxArea(arr, start, end) {
  if (start === end) {
    return arr[start]
  }

  if (start + 1n === end) {
    const minH = arr[start] < arr[end] ? arr[start] : arr[end]
    const maxH = arr[start] > arr[end] ? arr[start] : arr[end]

    return maxH < 2n * minH ? 2n * minH : maxH
  }

  const half = (start + end) / 2n

  const leftMax = getMaxArea(arr, start, half)
  const rightMax = getMaxArea(arr, half + 1n, end)

  let l = half
  let r = half
  let nowH = arr[half]
  let nowMax = arr[half]

  while (start < l || r < end) {
    const leftH = start < l ? arr[l - 1n] : 0n
    const rightH = r < end ? arr[r + 1n] : 0n

    if (leftH > rightH) {
      l -= 1n
      nowH = leftH < nowH ? leftH : nowH
      const nowArea = (r - l + 1n) * nowH
      nowMax = nowMax < nowArea ? nowArea : nowMax
    } // ::
    else if (leftH < rightH) {
      r += 1n
      nowH = rightH < nowH ? rightH : nowH
      const nowArea = (r - l + 1n) * nowH
      nowMax = nowMax < nowArea ? nowArea : nowMax
    } // ::
    else if (leftH > 0n) {
      l -= 1n
      nowH = leftH < nowH ? leftH : nowH
      const nowArea = (r - l + 1n) * nowH
      nowMax = nowMax < nowArea ? nowArea : nowMax
    } // ::
    else {
      break
    }
  }

  const maxSide = leftMax < rightMax ? rightMax : leftMax

  return nowMax < maxSide ? maxSide : nowMax
}