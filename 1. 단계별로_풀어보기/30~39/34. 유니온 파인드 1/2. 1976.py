import sys

sys.setrecursionlimit(100000)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
M = int(input())

connInfoArr = list(list(map(int, input().split())) for i in range(N))
visitArr = list(int(x) - 1 for x in input().split())

unionArr = list(i for i in range(N))

def getUnion(val):
  if unionArr[val] == val:
    return val

  unionArr[val] = getUnion(unionArr[val])

  return unionArr[val]

def joinUnion(a, b):
  smaller = min(a, b)
  bigger = max(a, b)

  smallerUnion = getUnion(smaller)
  biggerUnion = getUnion(bigger)

  unionArr[biggerUnion] = smallerUnion

def isSameUnion(a, b):
  return getUnion(a) == getUnion(b)

for a in range(N):
  for b in range(N):
    if connInfoArr[a][b] == 1:
      joinUnion(a, b)

result = 'YES'
for m in range(1, M):
  A = visitArr[m - 1]
  B = visitArr[m]

  if not isSameUnion(A, B):
    result = 'NO'

output(result)