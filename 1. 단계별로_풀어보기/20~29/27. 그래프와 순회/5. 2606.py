from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
M = int(input())
pairArr = list(list(map(int, input().split())) for i in range(M))

connArr = list(deque() for i in range(N + 1))
for a, b in pairArr:
  connArr[a].append(b)
  connArr[b].append(a)

isInfected = [False] * (N + 1)

nextInfect = deque()

def bfs(now):
  for next in connArr[now]:
    if isInfected[next] == False:
      isInfected[next] = True
      nextInfect.append(next)

  if len(nextInfect) > 0:
    next = nextInfect.popleft()
    bfs(next)

isInfected[1] = True
bfs(1)

output(f"{sum(1 for val in isInfected if val == True) - 1}")

