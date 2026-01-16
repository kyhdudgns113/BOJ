import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
A = list(map(int, input().split()))
ops = list(map(int, input().split()))

resultMax = -1234567890
resultMin = 1234567890

def operate(a, b, opIdx):
  if opIdx == 0:
    return a + b
  
  if opIdx == 1:
    return a - b
  
  if opIdx == 2:
    return a * b
  
  if opIdx == 3:
    if a * b >= 0:
      return a // b
    else:
      return -(abs(a) // abs(b))

def recurse(nowIdx, value):
  global resultMax, resultMin
  
  if nowIdx == N - 1:
    resultMax = max(resultMax, value)
    resultMin = min(resultMin, value)
    return
  
  for opIdx in range(4):
    if ops[opIdx] > 0:
      ops[opIdx] -= 1
      nextVal = operate(value, A[nowIdx + 1], opIdx)
      recurse(nowIdx + 1, nextVal)
      ops[opIdx] += 1

recurse(0, A[0])

output(f"{resultMax}\n{resultMin}")
