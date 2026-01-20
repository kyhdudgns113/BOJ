import sys

sys.setrecursionlimit(10 ** 6)

input = sys.stdin.readline
output = sys.stdout.write

N, K = map(int, input().split())
WVArr = list(list(map(int, input().split())) for i in range(N))

resultArr = list(list(None for i in range(K + 1)) for j in range(N))
resultArr[0][0] = 0

def getResult(n, k):

  if n == 0 and k == WVArr[n][0]:
    return WVArr[n][1]

  if resultArr[n][k] != None:
    return resultArr[n][k]

  w, v = WVArr[n]

  n0 = getResult(n - 1, k) if n > 0 else -1
  n1 = getResult(n - 1, k - w) if k >= w and n > 0 else -1

  n1 = n1 + v if n1 >= 0 else -1
  
  resultArr[n][k] = max(n0, n1)
  
  return resultArr[n][k]

output(f"{max([0] + list(getResult(N - 1, k) for k in range(K + 1)))}")