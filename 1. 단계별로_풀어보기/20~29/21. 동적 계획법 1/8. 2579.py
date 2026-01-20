import sys

sys.setrecursionlimit(10000)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
stairs = list(int(input()) for i in range(N))

resultArr = [[0 for i in range(2)] for j in range(N)]

def getResult(stairIdx, step):
  if stairIdx < 0:
    return 0

  if step == 0 and stairIdx < 2:
    resultArr[stairIdx][step] = stairs[stairIdx]
    return resultArr[stairIdx][step]
  
  if resultArr[stairIdx][step] > 0:
    return resultArr[stairIdx][step]

  if step == 0:
    resultArr[stairIdx][step] = max(getResult(stairIdx - 2, 0), getResult(stairIdx - 2, 1)) + stairs[stairIdx]
  else:
    resultArr[stairIdx][step] = getResult(stairIdx - 1, 0) + stairs[stairIdx]

  return resultArr[stairIdx][step]

output(f"{max(getResult(N - 1, 0), getResult(N - 1, 1))}")
