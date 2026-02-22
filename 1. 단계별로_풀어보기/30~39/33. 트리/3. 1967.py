import sys

sys.setrecursionlimit(100000)

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
connInfoArr = list([] for i in range(N + 1))

for _ in range(N - 1):
  parent, child, dist = map(int, input().split())
  connInfoArr[parent].append([child, dist])

depthArr = list(0 for i in range(N + 1))

ROOT_NODE = 1

result = 0

def DFS(now):
  global result

  temp0 = 0
  temp1 = 0
  for child, dist in connInfoArr[now]:
    childResult = DFS(child)
    temp = childResult + dist

    if temp0 < temp:
      temp1 = temp0
      temp0 = temp
    elif temp1 < temp:
      temp1 = temp

  result = max(result, temp0 + temp1)
  depthArr[now] = temp0
  return depthArr[now]

DFS(ROOT_NODE)

output(f"{result}")