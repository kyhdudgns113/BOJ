import sys

sys.setrecursionlimit(10000)

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())

minValue = []

def getMinValue(accArr, left, right):
  
  if minValue[left][right] != -1:
    return minValue[left][right]

  if left == right:
    minValue[left][right] = 0
    return minValue[left][right]

  minValue[left][right] = min((getMinValue(accArr, left, mid) + getMinValue(accArr, mid + 1, right)) for mid in range(left, right)) + accArr[right + 1] - accArr[left]
  return minValue[left][right]

  

for _ in range(T):
  K = int(input())
  fileArr = list(map(int, input().split()))

  accArr = list(0 for i in range(K + 1))

  for i in range(1, K + 1):
    accArr[i] = accArr[i - 1] + fileArr[i - 1]

  minValue = list(list(-1 for i in range(K)) for j in range(K))

  output(f"{getMinValue(accArr, 0, K - 1)}\n")

