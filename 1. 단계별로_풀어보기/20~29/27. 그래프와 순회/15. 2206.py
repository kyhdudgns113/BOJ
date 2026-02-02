from collections import deque
import sys

inputArr = sys.stdin.read().strip().split('\n')

N, M = map(int, inputArr[0].split())
mapInfo = [list(map(int, list(inputArr[i + 1]))) for i in range(N)]

# 현재 칸까지 최단거리를 저장할 배열
# 값이 1억이면 방문 안했다는 뜻이다.
# min 을 쓰기 위해 큰 값을 넣었다.
# [row][col][drill] - drill: 0=드릴 사용함, 1=드릴 사용 안함
isVisit = [[[100000000] * 2 for _ in range(M)] for _ in range(N)]

# BFS 용 방문큐
visitQueue = deque()

# 방문큐에 시작점의 정보를 입력한다.
visitQueue.append([0, 0, 1])  # [시작점의 row, 시작점의 col, 부술수 있는 벽의 갯수]
isVisit[0][0][1] = 1

# BFS 연산을 수행한다.
while visitQueue:
  nowRow, nowCol, numDrill = visitQueue.popleft()
  nowVal = isVisit[nowRow][nowCol][numDrill]

  # 조건 1: 이동할 칸이 존재하냐? (인덱스 범위 확인)
  # 조건 2: 이동할 수 있냐? (벽이 없거나 드릴이 남았거나)
  # 위쪽
  if nowRow > 0 and (mapInfo[nowRow - 1][nowCol] == 0 or numDrill > 0):
    nextDrill = numDrill if mapInfo[nowRow - 1][nowCol] == 0 else 0

    if nowVal + 1 < isVisit[nowRow - 1][nowCol][nextDrill]:
      visitQueue.append([nowRow - 1, nowCol, nextDrill])
      isVisit[nowRow - 1][nowCol][nextDrill] = nowVal + 1
  # 아래쪽
  if nowRow < N - 1 and (mapInfo[nowRow + 1][nowCol] == 0 or numDrill > 0):
    nextDrill = numDrill if mapInfo[nowRow + 1][nowCol] == 0 else 0

    if nowVal + 1 < isVisit[nowRow + 1][nowCol][nextDrill]:
      visitQueue.append([nowRow + 1, nowCol, nextDrill])
      isVisit[nowRow + 1][nowCol][nextDrill] = nowVal + 1
  # 왼쪽
  if nowCol > 0 and (mapInfo[nowRow][nowCol - 1] == 0 or numDrill > 0):
    nextDrill = numDrill if mapInfo[nowRow][nowCol - 1] == 0 else 0

    if nowVal + 1 < isVisit[nowRow][nowCol - 1][nextDrill]:
      visitQueue.append([nowRow, nowCol - 1, nextDrill])
      isVisit[nowRow][nowCol - 1][nextDrill] = nowVal + 1
  # 오른쪽
  if nowCol < M - 1 and (mapInfo[nowRow][nowCol + 1] == 0 or numDrill > 0):
    nextDrill = numDrill if mapInfo[nowRow][nowCol + 1] == 0 else 0

    if nowVal + 1 < isVisit[nowRow][nowCol + 1][nextDrill]:
      visitQueue.append([nowRow, nowCol + 1, nextDrill])
      isVisit[nowRow][nowCol + 1][nextDrill] = nowVal + 1

result = min(isVisit[N - 1][M - 1][0], isVisit[N - 1][M - 1][1])
if result == 100000000:
  print(-1)
else:
  print(result)
