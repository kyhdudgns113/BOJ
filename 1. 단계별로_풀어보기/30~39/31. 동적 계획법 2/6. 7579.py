import sys

sys.setrecursionlimit(10000)

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())
A = list(map(int, input().split()))
C = list(map(int, input().split()))

resultArr = list(list(None for i in range(10001)) for j in range(N + 1))

resultArr[0][0] = 0

def getResult(idx, c):
  if resultArr[idx][c] != None:
    return resultArr[idx][c]

  if idx == 0:
    return -1

  cost = C[idx - 1]
  mem = A[idx - 1]

  used = getResult(idx - 1, c - cost) if c >= cost else -1
  unUsed = getResult(idx - 1, c)

  if used > -1:
    used += mem

  resultArr[idx][c] = max(used, unUsed)
  return resultArr[idx][c]
  
output(f"{min(cost for cost in range(10001) if getResult(N, cost) >= M)}")
