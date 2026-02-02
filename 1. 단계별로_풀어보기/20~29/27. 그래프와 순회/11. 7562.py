from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

T = int(input())

for _ in range(T):
  L = int(input())
  startX, startY = map(int, input().strip().split())
  endX, endY = map(int, input().strip().split())

  isVisit = list(list(False for i in range(L)) for j in range(L))

  visitQueue = deque()

  isVisit[startX][startY] = 0
  visitQueue.append([startX, startY])

  while len(visitQueue) > 0:
    nowX, nowY = visitQueue.popleft()
    nowDist = isVisit[nowX][nowY]

    if nowY >= 2:
      if nowX >= 1 and isVisit[nowX - 1][nowY - 2] is False:
        isVisit[nowX - 1][nowY - 2] = nowDist + 1
        visitQueue.append([nowX - 1, nowY - 2])
      if nowX < L - 1 and isVisit[nowX + 1][nowY - 2] is False:
        isVisit[nowX + 1][nowY - 2] = nowDist + 1
        visitQueue.append([nowX + 1, nowY - 2])
    if nowY >= 1:
      if nowX >= 2 and isVisit[nowX - 2][nowY - 1] is False:
        isVisit[nowX - 2][nowY - 1] = nowDist + 1
        visitQueue.append([nowX - 2, nowY - 1])
      if nowX < L - 2 and isVisit[nowX + 2][nowY - 1] is False:
        isVisit[nowX + 2][nowY - 1] = nowDist + 1
        visitQueue.append([nowX + 2, nowY - 1])
    if nowY < L - 1:
      if nowX >= 2 and isVisit[nowX - 2][nowY + 1] is False:
        isVisit[nowX - 2][nowY + 1] = nowDist + 1
        visitQueue.append([nowX - 2, nowY + 1])
      if nowX < L - 2 and isVisit[nowX + 2][nowY + 1] is False:
        isVisit[nowX + 2][nowY + 1] = nowDist + 1
        visitQueue.append([nowX + 2, nowY + 1])
    if nowY < L - 2:
      if nowX >= 1 and isVisit[nowX - 1][nowY + 2] is False:
        isVisit[nowX - 1][nowY + 2] = nowDist + 1
        visitQueue.append([nowX - 1, nowY + 2])
      if nowX < L - 1 and isVisit[nowX + 1][nowY + 2] is False:
        isVisit[nowX + 1][nowY + 2] = nowDist + 1
        visitQueue.append([nowX + 1, nowY + 2])

  output(f"{isVisit[endX][endY]}\n")
