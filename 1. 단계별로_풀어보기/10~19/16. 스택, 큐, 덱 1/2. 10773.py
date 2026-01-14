from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

K = int(input())

queryArr = list(int(input()) for i in range(K))

stack = deque()

for query in queryArr:
  if query == 0:
    stack.pop()
  else:
    stack.append(query)

output(f"{sum(stack)}")