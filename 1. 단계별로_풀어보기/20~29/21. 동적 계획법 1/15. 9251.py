import sys

sys.setrecursionlimit(10 ** 5)

input = sys.stdin.readline
output = sys.stdout.write

A = list(input().strip())
B = list(input().strip())

resultArr = list(list(None for i in range(len(B))) for j in range(len(A)))

def getResult(a, b):

  if a < 0 or b < 0:
    return 0

  if resultArr[a][b] != None:
    return resultArr[a][b]

  resultArr[a][b] = 0

  if A[a] == B[b]:
    resultArr[a][b] = getResult(a - 1, b - 1) + 1
  else:
    resultArr[a][b] = max(getResult(a - 1, b), getResult(a, b - 1))

  return resultArr[a][b]

output(f"{getResult(len(A) - 1, len(B) - 1)}")