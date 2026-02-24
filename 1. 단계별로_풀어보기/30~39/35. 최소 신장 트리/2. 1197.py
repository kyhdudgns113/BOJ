from queue import PriorityQueue
import sys

sys.setrecursionlimit(200000)

input = sys.stdin.readline
output = sys.stdout.write

V, E = map(int, input().split())
connInfoArr = list(list(map(int, input().split())) for i in range(E))

edgePQ = PriorityQueue()
unionArr = list(i for i in range(V + 1))
numMemArr = list(1 for i in range(V + 1))
weightArr = list(0 for i in range(V + 1))

##############################
#                            #
# START: 사용할 함수 영역      #
#                            #
##############################

def findRoot(now):
  if unionArr[now] == now:
    return now

  unionArr[now] = findRoot(unionArr[now])
  return unionArr[now]

def joinUnion(a, b, weight):
  smaller = min(a, b)
  bigger = max(a, b)

  smallerRoot = findRoot(smaller)
  biggerRoot = findRoot(bigger)

  if smallerRoot != biggerRoot:
    unionArr[biggerRoot] = smallerRoot
    numMemArr[smallerRoot] += numMemArr[biggerRoot]
    weightArr[smallerRoot] += weightArr[biggerRoot] + weight

  return [numMemArr[smallerRoot], weightArr[smallerRoot]]

def isSameUnion(a, b):
  return findRoot(a) == findRoot(b)

##############################
#                            #
# END: 사용할 함수 영역        #
#                            #
##############################

# 우선순위 큐에 간선정보 삽입
for A, B, weight in connInfoArr:
  edgePQ.put((weight, A, B))

while not edgePQ.empty():
  weight, A, B = edgePQ.get()

  if not isSameUnion(A, B):
    numMem, sumWeight = joinUnion(A, B, weight)

    if numMem == V:
      output(f"{sumWeight}")
      break
