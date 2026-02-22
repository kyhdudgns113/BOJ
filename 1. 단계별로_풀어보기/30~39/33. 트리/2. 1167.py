import sys

sys.setrecursionlimit(200000)

input = sys.stdin.readline
output = sys.stdout.write

V = int(input())

connInfoArr = list([] for i in range(V + 1))

for _ in range(V):
  inputRow = list(map(int, input().split()))
  v = inputRow[0]

  i = 1
  for i in range(1, len(inputRow), 2):
    if inputRow[i] == -1:
      break
    next = inputRow[i]
    cost = inputRow[i + 1]
    connInfoArr[v].append([next, cost])


depthArr = list(0 for i in range(V + 1))
parentArr = list(-1 for i in range(V + 1))

result = 0

def DFS(now):
  global result

  temp0 = 0
  temp1 = 0

  for next, cost in connInfoArr[now]:
    if parentArr[next] == -1:
      parentArr[next] = now
      temp = DFS(next) + cost

      if temp0 < temp:
        temp1 = temp0
        temp0 = temp
      elif temp1 < temp:
        temp1 = temp

  result = max(result, temp0 + temp1)
  depthArr[now] = temp0
  return temp0

ROOT_NODE = 1
parentArr[ROOT_NODE] = 0
DFS(ROOT_NODE)

output(f"{result}")