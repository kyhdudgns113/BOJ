from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
queryArr = list(list(map(int, input().split())) for i in range(N))

deque = deque()

for query in queryArr:
  order = query[0]

  match (order):
    case 1:
      X = query[1]
      deque.appendleft(X)
    case 2:
      X = query[1]
      deque.append(X)
    case 3:
      if len(deque) > 0:
        output(f"{deque.popleft()}\n")
      else:
        output(f"-1\n")
    case 4:
      if len(deque) > 0:
        output(f"{deque.pop()}\n")
      else:
        output(f"-1\n")
    case 5:
      output(f"{len(deque)}\n")
    case 6:
      output(f"{1 if len(deque) == 0 else 0}\n")
    case 7:
      if len(deque) > 0:
        output(f"{deque[0]}\n")
      else:
        output(f"-1\n")
    case 8:
      if len(deque) > 0:
        output(f"{deque[-1]}\n")
      else:
        output(f"-1\n")