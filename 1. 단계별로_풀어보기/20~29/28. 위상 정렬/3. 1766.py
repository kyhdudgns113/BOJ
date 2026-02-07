import sys
from queue import PriorityQueue

input = sys.stdin.readline
output = sys.stdout.write

# 입력 파싱
N, M = map(int, input().split())
ABArr = [list(map(int, input().split())) for _ in range(M)]
backListArr = [[] for _ in range(N + 1)]
remainArr = [0] * (N + 1)

for A, B in ABArr:
  backListArr[A].append(B)
  remainArr[B] += 1

visitQueue = PriorityQueue()

for i in range(1, N + 1):
  if remainArr[i] == 0:
    visitQueue.put(i)

while not visitQueue.empty():
  now = visitQueue.get()
  
  for nextNum in backListArr[now]:
    remainArr[nextNum] -= 1
    
    if remainArr[nextNum] == 0:
      visitQueue.put(nextNum)
  
  output(f"{now} ")

