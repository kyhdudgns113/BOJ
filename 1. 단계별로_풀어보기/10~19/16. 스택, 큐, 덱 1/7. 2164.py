from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

queue = deque(i + 1 for i in range(N))

while len(queue) >= 2:
  queue.popleft()
  queue.append(queue.popleft())

output(f"{queue[0]}")