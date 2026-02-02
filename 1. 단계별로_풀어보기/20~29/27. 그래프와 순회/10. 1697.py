from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

N, K = map(int, input().split())

resultArr = [None] * 200002
resultArr[N] = 0

visitQueue = deque()
visitQueue.append(N)

while len(visitQueue) > 0:
  now = visitQueue.popleft()
  nowDist = resultArr[now]

  if now > 0 and resultArr[now - 1] == None:
    resultArr[now - 1] = nowDist + 1
    visitQueue.append(now - 1)
  if now < 200000 and resultArr[now + 1] == None:
    resultArr[now + 1] = nowDist + 1
    visitQueue.append(now + 1)
  if now < 100000 and resultArr[2 * now] == None:
    resultArr[2 * now] = nowDist + 1
    visitQueue.append(2 * now)

output(f"{resultArr[K]}")