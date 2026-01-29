from queue import PriorityQueue
import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())

pq = PriorityQueue()

for idx in range(N):
  numArr = list(map(int, input().split()))

  for num in numArr:
    pq.put(num)

  if idx > 0:
    for _ in range(N):
      pq.get()

output(f"{pq.get()}")
