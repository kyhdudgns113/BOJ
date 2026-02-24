from queue import PriorityQueue
import sys

input = sys.stdin.readline
output = sys.stdout.write

unionArr = list(i for i in range(200000))
numMemArr = list(1 for i in range(200000))
weightArr = list(0 for i in range(200000))
edgePQ = PriorityQueue()

##############################
#      사용할 함수 영역        #
##############################

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

while True:
  M, N = map(int, input().split())

  if M == 0:
    break

  for i in range(200000):
    unionArr[i] = i
    numMemArr[i] = 1
    weightArr[i] = 0
  edgePQ = PriorityQueue()

  totalLen = 0

  for n in range(N):
    A, B, dist = map(int, input().split())
    totalLen += dist
    edgePQ.put((dist, A, B))

  while not edgePQ.empty():
    weight, A, B = edgePQ.get()

    if not isSameUnion(A, B):
      numMem, resultW = joinUnion(A, B, weight)

      if numMem == M:
        output(f"{totalLen - resultW}\n")
        break
