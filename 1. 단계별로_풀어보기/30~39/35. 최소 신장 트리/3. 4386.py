from queue import PriorityQueue
import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
axisArr = list(list(map(float, input().split())) for i in range(N))

unionArr = list(i for i in range(N))
numMemArr = list(1 for i in range(N))
costArr = list(0.0 for i in range(N))

def findRoot(now):
  if unionArr[now] == now:
    return now
  unionArr[now] = findRoot(unionArr[now])
  return unionArr[now]

def isSameUnion(a, b):
  return findRoot(a) == findRoot(b)

def joinUnion(a, b, cost):
  smaller = min(a, b)
  bigger = max(a, b)
  smallRoot = findRoot(smaller)
  bigRoot = findRoot(bigger)
  if smallRoot != bigRoot:
    unionArr[bigRoot] = smallRoot
    numMemArr[smallRoot] += numMemArr[bigRoot]
    costArr[smallRoot] += costArr[bigRoot] + cost
  return [numMemArr[smallRoot], costArr[smallRoot]]

def dist(idxA, idxB):
  A = axisArr[idxA]
  B = axisArr[idxB]
  return (A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2

edgePQ = PriorityQueue()
for i in range(N):
  for j in range(i + 1, N):
    edgePQ.put((dist(i, j), i, j))

if N <= 1:
  output("0.00")
else:
  while not edgePQ.empty():
    d, idxA, idxB = edgePQ.get()
    if not isSameUnion(idxA, idxB):
      numMem, sumCost = joinUnion(idxA, idxB, d ** 0.5)
      if numMem == N:
        output(f"{sumCost:.2f}")
        break
