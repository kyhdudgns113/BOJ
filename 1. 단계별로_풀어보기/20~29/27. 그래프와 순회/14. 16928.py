from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

N, M = map(int, input().split())
ladderArr = list(map(int, input().split()) for i in range(N))
snakeArr = list(map(int, input().split()) for i in range(M))

blockInfo = list(i for i in range(101))

# 사다리 정보를 입력한다
for ladder in ladderArr:
  start, end = ladder
  blockInfo[start] = end

# 뱀 정보를 입력한다
for snake in snakeArr:
  start, end = snake
  blockInfo[start] = end

# BFS 용 큐에 시작점을 넣는다
visitQueue = deque()
visitQueue.append(1)

# 도달하기 위한 최소한의 턴을 저장한다.
# 도달하지 못하면 -1
isVisit = list(-1 for i in range(101))
isVisit[1] = 0

while visitQueue:
  now = visitQueue.popleft()
  nowVal = isVisit[now]

  for dice in range(1, 7):
    next = now + dice
    if next > 100:
      break

    if isVisit[next] == -1:
      isVisit[next] = nowVal + 1

      if blockInfo[next] != next:
        realNext = blockInfo[next]

        if isVisit[realNext] == -1:
          isVisit[realNext] = nowVal + 1
          visitQueue.append(realNext)
      else:
        visitQueue.append(next)

# 결과 출력
output(f"{isVisit[100]}")