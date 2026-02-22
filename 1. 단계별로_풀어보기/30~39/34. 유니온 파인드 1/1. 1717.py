import sys

sys.setrecursionlimit(100000)

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())

unionArr = list(i for i in range(N + 1))

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

for m in range(M):
  op, a, b = map(int, input().split())

  if op == 0:
    joinUnion(a, b)
  else:
    output(f"{'YES' if isSameUnion(a, b) else 'NO'}\n")
