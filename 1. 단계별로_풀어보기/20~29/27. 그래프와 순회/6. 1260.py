from collections import deque
import sys

sys.setrecursionlimit(10 ** 5)

input = sys.stdin.readline
output = sys.stdout.write

N, M, V = map(int, input().split())
pairArr = list(list(map(int, input().split())) for i in range(M))

connArr = list(list([]) for i in range(N + 1))

# Python 의 List 는 배열 형태지만 삽입에 항상 O(N) 이 아니다.
for a, b in pairArr:
  connArr[a].append(b)
  connArr[b].append(a)

for conn in connArr:
  conn.sort()

bfsQueue = deque()

isVisitDFS = [False] * (N + 1)
isVisitBFS = [False] * (N + 1)

def dfs(now):
  output(f"{now} ")
  isVisitDFS[now] = True

  for next in connArr[now]:
    if isVisitDFS[next] == False:
      dfs(next)

def bfs(now):
  output(f"{now} ")
  isVisitBFS[now] = True

  for next in connArr[now]:
    if isVisitBFS[next] == False:
      isVisitBFS[next] = True
      bfsQueue.append(next)
  
  if len(bfsQueue) > 0:
    next = bfsQueue.popleft()
    bfs(next)

dfs(V)
output('\n')
bfs(V)

