import sys

sys.setrecursionlimit(100000)

input = sys.stdin.readline
output = sys.stdout.write

parentArr = []
connInfoArr = []

def isTree(parent, now):
  result = True
  for child in connInfoArr[now]:
    if child != parent:
      if parentArr[child] != 0:
        result = False
      else:
        parentArr[child] = now
        temp = isTree(now, child)
        result = result & temp

  return result

caseIdx = 1
while True:
  N, M = map(int, input().split())

  if N == 0:
    break

  connInfoArr = list([] for i in range(N + 1))
  parentArr = list(0 for i in range(N + 1))

  for m in range(M):
    A, B = map(int, input().split())
    connInfoArr[A].append(B)
    connInfoArr[B].append(A)

  numTree = 0

  for i in range(1, N + 1):
    if parentArr[i] == 0:
      parentArr[i] = i
      numTree += 1 if isTree(i, i) else 0

  if numTree > 1:
    output(f"Case {caseIdx}: A forest of {numTree} trees.\n")
  elif numTree == 1:
    output(f"Case {caseIdx}: There is one tree.\n")
  else:
    output(f"Case {caseIdx}: No trees.\n")

  caseIdx += 1
  
