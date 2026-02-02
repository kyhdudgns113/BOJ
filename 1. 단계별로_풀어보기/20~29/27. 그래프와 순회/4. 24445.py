from collections import deque
import sys

sys.setrecursionlimit(10 ** 6)

input = sys.stdin.readline
output = sys.stdout.write

N, M, R = map(int, input().split())
UVArr = list(list(map(int, input().split())) for i in range(M))

vListArr = list([] for i in range(N + 1))

for u, v in UVArr:
  vListArr[u].append(v)
  vListArr[v].append(u)

for vList in vListArr:
  vList.sort(reverse=True)

isVisit = list (0 for i in range(N + 1))
nowVisit = 1

visitQueue = deque()

visitQueue.append(R)
isVisit[R] = nowVisit
nowVisit += 1

def bfs(now):
  global nowVisit
  for v in vListArr[now]:
    if isVisit[v] == 0:
      isVisit[v] = nowVisit
      nowVisit += 1
      visitQueue.append(v)

  if len(visitQueue) > 0:
    next = visitQueue.popleft()
    bfs(next)

bfs(R)

for u in range(1, N + 1):
  output(f"{isVisit[u]}\n")