import sys

sys.setrecursionlimit(10000)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
rcArr = list(list(map(int, input().split())) for i in range(N))

resultArr = list(list(-1 for i in range(N)) for j in range(N))

def getResult(start, end):
  if resultArr[start][end] != -1:
    return resultArr[start][end]

  if start == end:
    resultArr[start][end] = 0
    return 0

  resultArr[start][end] = min((getResult(start, mid) + getResult(mid + 1, end) + rcArr[start][0] * rcArr[mid][1] * rcArr[end][1]) for mid in range(start, end))
  return resultArr[start][end]

output(f"{getResult(0, N - 1)}")