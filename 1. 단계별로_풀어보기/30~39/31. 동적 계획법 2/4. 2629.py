import sys

sys.setrecursionlimit(10000)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
weightArr = list(map(int, input().split()))
M = int(input())
queryArr = list(map(int, input().split()))

resultArr = list(list(-1 for i in range(40001)) for j in range(N + 1))
resultArr[0][0] = 1

def getResult(rIdx, w):
  if resultArr[rIdx][w] != -1:
    return resultArr[rIdx][w]

  if rIdx == 0:
    resultArr[rIdx][w] = 0
    return 0

  resultArr[rIdx][w] = max(
    0,
    getResult(rIdx - 1, w),
    getResult(rIdx - 1, abs(w - weightArr[rIdx - 1])),
    getResult(rIdx - 1, w + weightArr[rIdx - 1]) if w + weightArr[rIdx - 1] <= 40000 else 0
  )
  return resultArr[rIdx][w]
  
output(f"{' '.join('Y' if getResult(N, query) == 1 else 'N' for query in queryArr)}")