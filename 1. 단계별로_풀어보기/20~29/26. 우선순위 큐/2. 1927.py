from queue import PriorityQueue
import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

queryArr = list(int(input()) for i in range(N))
pq = PriorityQueue()

for query in queryArr:
  if query == 0:
    if pq.empty():
      output(f"0\n")
    else:
      priority, value = pq.get()
      output(f"{value}\n")
  else:
    priority = query
    value = query
    pq.put([priority, value])
