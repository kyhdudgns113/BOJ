from queue import PriorityQueue
from collections import deque
import sys

input = sys.stdin.readline
output = sys.stdout.write

N = int(input())
M = int(input())
busInfoArr = list(list(map(int, input().split())) for i in range(M))
first, last = map(int, input().split())

connInfoArr = list([] for i in range(N + 1))
resultArr = list(200000000 for i in range(N + 1))
prevArr = list(-1 for i in range(N + 1))

visitQueue = PriorityQueue()

for start, end, cost in busInfoArr:
  connInfoArr[start].append([end, cost])

resultArr[first] = 0
visitQueue.put((0, first))

while not visitQueue.empty():
  nowDist, now = visitQueue.get()

  if resultArr[now] < nowDist:
    continue

  for next, cost in connInfoArr[now]:
    if resultArr[next] > nowDist + cost:
      resultArr[next] = nowDist + cost
      prevArr[next] = now
      visitQueue.put((nowDist + cost, next))

printList = deque()

now = last

while now != -1:
  printList.appendleft(str(now))
  now = prevArr[now]

output(f"{resultArr[last]}\n")
output(f"{len(printList)}\n")
output(f"{' '.join(printList)}\n")
