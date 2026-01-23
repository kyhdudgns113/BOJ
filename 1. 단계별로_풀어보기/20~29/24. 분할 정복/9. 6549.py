import sys

input = sys.stdin.readline
output = sys.stdout.write

def getMaxArea(arr, start, end):
  if start == end:
    return arr[start]

  if start + 1 == end:
    minH = min(arr[start], arr[end])
    maxH = max(arr[start], arr[end])

    return max(maxH, 2 * minH)

  half = (start + end) // 2

  leftMax = getMaxArea(arr, start, half)
  rightMax = getMaxArea(arr, half + 1, end)

  l = half
  r = half
  nowH = arr[half]
  nowMax = arr[half]

  while start < l or r < end:
    leftH = arr[l - 1] if start < l else 0
    rightH = arr[r + 1] if r < end else 0

    if leftH > rightH:
      l -= 1
      nowH = min(leftH, nowH)
      nowArea = (r - l + 1) * nowH
      nowMax = max(nowMax, nowArea)
    elif leftH < rightH:
      r += 1
      nowH = min(rightH, nowH)
      nowArea = (r - l + 1) * nowH
      nowMax = max(nowMax, nowArea)
    elif leftH > 0:
      l -= 1
      nowH = min(leftH, nowH)
      nowArea = (r - l + 1) * nowH
      nowMax = max(nowMax, nowArea)
    else:
      break

  return max(nowMax, leftMax, rightMax)

while True:
  test = list(map(int, input().split()))
  if test[0] == 0:
    break
  H = test[1:]
  output(str(getMaxArea(H, 0, len(H) - 1)) + '\n')
