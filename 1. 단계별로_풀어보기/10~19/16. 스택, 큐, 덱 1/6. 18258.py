from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

queue = deque()

for _ in range(N):
  query = list(input().strip().split(' '))

  order = query[0]

  if order == 'push':
    X = int(query[1])
    queue.append(X)
  elif order == 'pop':
    if len(queue) > 0:
      output(f"{queue.popleft()}\n")
    else:
      output('-1\n')
  elif order == 'size':
    output(f"{len(queue)}\n")
  elif order == 'empty':
    output(f"{1 if len(queue) == 0 else 0}\n")
  elif order == 'front':
    if len(queue) > 0:
      output(f"{queue[0]}\n")
    else:
      output("-1\n")
  else:
    if len(queue) > 0:
      output(f"{queue[-1]}\n")
    else:
      output("-1\n")
  