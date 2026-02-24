from queue import PriorityQueue
import sys, math

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())
axisArr = list(list(map(int, input().split())) for i in range(N))
alreadyArr = list(list(map(int, input().split())) for i in range(M))

unionArr = list(i for i in range(N + 1))
numMemArr = list(1 for i in range(N + 1))
weightArr = list(0 for i in range(N + 1))
edgePQ = PriorityQueue()

##############################
#      사용할 함수 영역        #
##############################

def distance(a, b):
  A = axisArr[a - 1]
  B = axisArr[b - 1]

  return math.sqrt(pow(A[0] - B[0], 2) + pow(A[1] - B[1], 2))

def findUnion(now):
  if unionArr[now] == now:
    return now

  unionArr[now] = findUnion(unionArr[now])
  return unionArr[now]

def isSameUnion(a, b):
  return findUnion(a) == findUnion(b)

def joinUnion(a, b, weight):
  c = min(a, b)
  d = max(a, b)

  cU = findUnion(c)
  dU = findUnion(d)

  if cU != dU:
    unionArr[dU] = cU
    numMemArr[cU] += numMemArr[dU]

    if weight > 0:
      weightArr[cU] += weightArr[dU] + weight

  return [numMemArr[cU], weightArr[cU]]

############################
#       문제풀이 영역        #
############################

for a, b in alreadyArr:
  joinUnion(a, b, 0)

for i in range(1, N + 1):
  for j in range(i + 1, N + 1):
    edgePQ.put((distance(i, j), i, j))

while not edgePQ.empty():
  weight, a, b = edgePQ.get()

  if not isSameUnion(a, b):
    numMem, resultWeight = joinUnion(a, b, weight)

    if numMem == N:
      output(f"{resultWeight:.2f}")
      break