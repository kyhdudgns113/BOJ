import sys

sys.setrecursionlimit(100000)

input = sys.stdin.readline
output = sys.stdout.write

A = list(input().strip())
B = list(input().strip())

lenArr = list(list(-1 for i in range(len(B) + 1)) for j in range(len(A) + 1))
prevArr = list(list([-1, -1] for i in range(len(B) + 1)) for j in range(len(A) + 1))

def getLen(a, b):
  if lenArr[a][b] != -1:
    return lenArr[a][b]

  if a + b == 0:
    lenArr[a][b] = 1 if A[a] == B[b] else 0
    return lenArr[a][b]

  if a == 0 or b == 0:
    if A[a] == B[b]:
      lenArr[a][b] = 1
      return lenArr[a][b]

  if A[a] == B[b]:
    lenArr[a][b] = getLen(a - 1, b - 1) + 1
    prevArr[a][b] = prevArr[a - 1][b - 1] if A[a - 1] != B[b - 1] else [a - 1, b - 1]

    return lenArr[a][b]
  else:
    lenArr[a][b] = 0

    if a > 0 and lenArr[a][b] < getLen(a - 1, b):
      lenArr[a][b] = lenArr[a - 1][b]
      prevArr[a][b] = prevArr[a - 1][b] if A[a - 1] != B[b] else [a - 1, b]
    if b > 0 and lenArr[a][b] < getLen(a, b - 1):
      lenArr[a][b] = lenArr[a][b - 1]
      prevArr[a][b] = prevArr[a][b - 1] if A[a] != B[b - 1] else [a, b - 1]

    return lenArr[a][b]

getLen(len(A) - 1, len(B) - 1)

result = []

a, b = prevArr[len(A) - 1][len(B) - 1]

if A[-1] == B[-1]:
  result.append(A[-1])

while a != -1:
  result.append(A[a])
  a, b = prevArr[a][b]

result.reverse()

output(f"{len(result)}\n")
output(f"{''.join(res for res in result)}")