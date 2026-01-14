from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
queryArr = list(list(map(int, input().split())) for i in range(N))

stack = deque()

for query in queryArr:
  order = query[0]

  match (order):
    case 1:
      X = query[1]
      stack.append(X)
    case 2:
      if len(stack) > 0:
        output(f"{stack.pop()}\n")
      else:
        output(f"-1\n")
    case 3:
      output(f"{len(stack)}\n")
    case 4:
      output(f"{1 if len(stack) == 0 else 0}\n")
    case 5:
      if len(stack) > 0:
        output(f"{stack[-1]}\n")
      else:
        output(f"-1\n")
