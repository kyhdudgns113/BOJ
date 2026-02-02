from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

K = int(input())

for _ in range(K):
  V, E = map(int, input().split())

  connectArr = list([] for i in range(V + 1))

  for __ in range(E):
    u, v = map(int, input().split())
    connectArr[u].append(v)
    connectArr[v].append(u)

  # 팀은 0팀, 1팀으로 하고, 팀이 없으면 None 으로 한다
  isVisit = [None] * (V + 1)

  visitQueue = deque()

  result = 'YES'

  for node in range(1, V + 1):
    if isVisit[node] == None:
      isVisit[node] = 0
      visitQueue.append(node)

      while visitQueue:
        now = visitQueue.popleft()
        nowTeam = isVisit[now]

        for next in connectArr[now]:
          if isVisit[next] == None:
            isVisit[next] = 1 - nowTeam
            visitQueue.append(next)
          elif isVisit[next] == nowTeam:
            result = 'NO'
            break

        if result == 'NO':
          break
      
    if result == 'NO':
      break
  
  output(f"{result}\n")

