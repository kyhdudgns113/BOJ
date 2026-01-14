from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

n = int(input())
papers = list(map(int, input().split()))

q = deque([i + 1, papers[i]] for i in range(n))
while len(q) > 0:
  num, idx = q.popleft()
  output(str(num) + ' ')
  try:
    while idx > 1:
      q.append(q.popleft())
      idx -= 1
    while idx < 0:
      q.appendleft(q.pop())
      idx += 1
  except:
    break
