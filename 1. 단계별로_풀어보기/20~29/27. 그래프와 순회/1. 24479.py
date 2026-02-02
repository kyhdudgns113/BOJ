from queue import PriorityQueue
import sys

sys.setrecursionlimit(1000000)

input = sys.stdin.readline
output = sys.stdout.write

N, M, R = map(int, input().split())
UVArr = list(list(map(int, input().split())) for i in range(M))

vListArr = list([] for i in range(N + 1))
isVisit = list(0 for i in range(N + 1))
visitCnt = 1

for u, v in UVArr:
  vListArr[u].append(v)
  vListArr[v].append(u)

for vList in vListArr:
  vList.sort()


def dfs(now):
  global visitCnt
  isVisit[now] = visitCnt
  visitCnt += 1

  for v in vListArr[now]:
    if isVisit[v] == 0:
      dfs(v)

dfs(R)

for i in range(1, N + 1):
  output(f"{isVisit[i]}\n")
