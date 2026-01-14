from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
numArr = list(map(int, input().split()))
numIdx = 0

extraStack = deque()
result = 'Nice'

for i in range(1, N + 1):
  isFind = False

  if len(extraStack) > 0 and extraStack[-1] == i:
    isFind = True         # 불필요하긴 하다
    extraStack.pop()
    continue

  while numIdx < N:
    if numArr[numIdx] == i:
      numIdx += 1
      isFind = True
      break
    else:
      extraStack.append(numArr[numIdx])
    numIdx += 1

  if not isFind:
    result = 'Sad'
    break

output(f"{result}")
