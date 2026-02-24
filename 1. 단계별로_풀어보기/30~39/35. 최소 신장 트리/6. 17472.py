from queue import PriorityQueue
import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())
mapMatrix = list(list(map(int, input().split())) for i in range(N))

edgePQ = PriorityQueue()
numIsland = list(list(0 for i in range(M)) for j in range(N))
numMemArr = list(1 for i in range(N * M))
unionArr = list(i for i in range(N * M))
weightArr = list(0 for i in range(N * M))

##############################
#      사용할 함수 영역        #
##############################

def DFS(row, col, team):
  global N, M

  numIsland[row][col] = team

  nextRowArr = [row - 1, row + 1, row, row]
  nextColArr = [col, col, col - 1, col + 1]

  for i in range(4):
    nextRow = nextRowArr[i]
    nextCol = nextColArr[i]

    if 0 <= nextRow < N and 0 <= nextCol < M and mapMatrix[nextRow][nextCol] == 1 and numIsland[nextRow][nextCol] == 0:
      DFS(nextRow, nextCol, team)

def findUnion(now):
  if unionArr[now] == now:
    return now

  unionArr[now] = findUnion(unionArr[now])
  return unionArr[now]

def isSameUnion(a, b):
   return findUnion(a) == findUnion(b)

def joinUnion(a, b, w):
  c = min(a, b)
  d = max(a, b)

  cUnion = findUnion(c)
  dUnion = findUnion(d)

  if cUnion != dUnion:
    unionArr[dUnion] = cUnion
    numMemArr[cUnion] += numMemArr[dUnion]
    weightArr[cUnion] += weightArr[dUnion] + w

  return [numMemArr[cUnion], weightArr[cUnion]]

############################
#       문제풀이 영역        #
############################

cntIsland = 0

for i in range(N):
  for j in range(M):
    if mapMatrix[i][j] == 1 and numIsland[i][j] == 0:
      cntIsland += 1
      DFS(i, j, cntIsland)


# 각 행마다 가로로 이동하며 다리 놓아보기
for row in range(N):
  lenBridge = 0
  nowIsland = 0

  for col in range(M):
    if mapMatrix[row][col] == 0:
      lenBridge += 1
    else:
      if nowIsland != numIsland[row][col]:
        if nowIsland > 0 and numIsland[row][col] > 0 and lenBridge >= 2:
          edgePQ.put((lenBridge, nowIsland, numIsland[row][col]))
        nowIsland = numIsland[row][col]
      lenBridge = 0

# 각 열마다 세로로 이동하며 다리 놓아보기
for col in range(M):
  lenBridge = 0
  nowIsland = 0

  for row in range(N):
    if mapMatrix[row][col] == 0:
      lenBridge += 1
    else:
      if nowIsland != numIsland[row][col]:
        if nowIsland > 0 and numIsland[row][col] > 0 and lenBridge >= 2:
          edgePQ.put((lenBridge, nowIsland, numIsland[row][col]))
        nowIsland = numIsland[row][col]
      lenBridge = 0

# 최소 신장트리 구성
isPossible = False
while not edgePQ.empty():
  w, a, b = edgePQ.get()

  if not isSameUnion(a, b):
    numMem, resultW = joinUnion(a, b, w)

    if numMem == cntIsland:
      output(f"{resultW}")
      isPossible = True
      break

if not isPossible:
  output('-1')
