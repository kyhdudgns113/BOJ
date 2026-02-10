import sys

input = sys.stdin.readline
output = sys.stdout.write

N, S = map(int, input().split())
numArr = list(map(int, input().split()))

sumArr = list(0 for i in range(N + 1))
for i in range(1, N + 1):
  sumArr[i] = sumArr[i - 1] + numArr[i - 1]

minDist = N + 1
left = 0
right = 1

while right <= N:
  rangeSum = sumArr[right] - sumArr[left]

  if S <= rangeSum:
    minDist = min(minDist, right - left)

  if rangeSum < S or left + 1 == right:
    right += 1
  else:
    left += 1

output(f"{0 if minDist == N + 1 else minDist}")
