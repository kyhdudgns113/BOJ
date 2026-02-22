import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())

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

isBreak = False

for m in range(M):
  A, B = map(int, input().split())

  if isSameUnion(A, B):
    isBreak = True
    output(f"{m + 1}")
    break

  joinUnion(A, B)

if not isBreak:
  output(f"0")
