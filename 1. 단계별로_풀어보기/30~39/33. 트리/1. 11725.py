import sys

sys.setrecursionlimit(100000)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
treeInfoArr = list(list(map(int, input().split())) for i in range(N - 1))

connArr = list([] for i in range(N + 1))
parentArr = list(-1 for i in range(N + 1))

parentArr[1] = 1
for a, b in treeInfoArr:
  connArr[a].append(b)
  connArr[b].append(a)

def DFS(now):
  for next in connArr[now]:
    if parentArr[next] == -1:
      parentArr[next] = now
      DFS(next)

DFS(1)

output(f"{'\n'.join(str(num) for num in parentArr[2:])}")