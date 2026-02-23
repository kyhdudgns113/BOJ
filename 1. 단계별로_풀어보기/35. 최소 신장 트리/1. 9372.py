from queue import PriorityQueue
import sys

sys.setrecursionlimit(100000)

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())

numMemMap = {}
unionArr = list(i for i in range(1001))
visitQueue = PriorityQueue()

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

def joinUnion(a, b):
  smaller = min(a, b)
  bigger = max(a, b)

  smallerRoot = findRoot(smaller)
  biggerRoot = findRoot(bigger)

  if smallerRoot != biggerRoot:
    unionArr[biggerRoot] = smallerRoot
    numMemMap[smallerRoot] += numMemMap[biggerRoot]

  return numMemMap[smallerRoot]

def isSameUnion(a, b):
  return findRoot(a) == findRoot(b)

##############################
#                            #
# END: 사용할 함수 영역        #
#                            #
##############################

for _ in range(T):
  N, M = map(int, input().split())

  for i in range(1, N + 1):
    numMemMap[i] = 1
    unionArr[i] = i

  visitQueue = PriorityQueue()

  for m in range(M):
    A, B = map(int, input().split())
    visitQueue.put((A, B))

  result = 0

  while not visitQueue.empty():
    A, B = visitQueue.get()

    numMem = 0
    if not isSameUnion(A, B):
      numMem = joinUnion(A, B)
      result += 1

    if numMem == N:
      break

  output(f"{result}\n")