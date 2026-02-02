from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

M, N = map(int, input().split())
boxMatrix = list(list(map(int, input().split())) for i in range(N))

isVisit = list(list(-1 for i in range(M)) for j in range(N))

visitQueue = deque()

for row in range(N):
  for col in range(M):
    # 익은 토마토는 0일만에 익었음을 표시 + 방문큐에 저장
    if boxMatrix[row][col] == 1:
      isVisit[row][col] = 0
      visitQueue.append([row, col])
    # 빈 공간은 0일만에 익었다고 간주
    elif boxMatrix[row][col] == -1:
      isVisit[row][col] = 0

result = 0

# BFS 연산
while len(visitQueue) > 0:
  nowRow, nowCol = visitQueue.popleft()
  nowDate = isVisit[nowRow][nowCol]
  result = max(result, nowDate)

  if nowRow > 0 and boxMatrix[nowRow - 1][nowCol] == 0 and isVisit[nowRow - 1][nowCol] == -1:
    isVisit[nowRow - 1][nowCol] = nowDate + 1
    visitQueue.append([nowRow - 1, nowCol])

  if nowRow < N - 1 and boxMatrix[nowRow + 1][nowCol] == 0 and isVisit[nowRow + 1][nowCol] == -1:
    isVisit[nowRow + 1][nowCol] = nowDate + 1
    visitQueue.append([nowRow + 1, nowCol])

  if nowCol > 0 and boxMatrix[nowRow][nowCol - 1] == 0 and isVisit[nowRow][nowCol - 1] == -1:
    isVisit[nowRow][nowCol - 1] = nowDate + 1
    visitQueue.append([nowRow, nowCol - 1])
    
  if nowCol < M - 1 and boxMatrix[nowRow][nowCol + 1] == 0 and isVisit[nowRow][nowCol + 1] == -1:
    isVisit[nowRow][nowCol + 1] = nowDate + 1
    visitQueue.append([nowRow, nowCol + 1])


howManyNull = sum(len(list(1 for col in range(M) if isVisit[row][col] == -1)) for row in range(N))

if howManyNull > 0:
  output(f"-1")
else:
  output(f"{result}")