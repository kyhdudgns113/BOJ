from queue import PriorityQueue
import sys

input = sys.stdin.readline
output = sys.stdout.write

N, K = map(int, input().split())

isVisit = [300000] * 200001

visitQueue = PriorityQueue()

isVisit[N] = 0
visitQueue.put((0, N))

while not visitQueue.empty():
  seconds, now = visitQueue.get()
  if isVisit[now] < seconds:
    continue

  if now > 0:
    if isVisit[now - 1] > seconds + 1:
      isVisit[now - 1] = seconds + 1
      visitQueue.put((seconds + 1, now - 1))
  if now < 200000:
    if isVisit[now + 1] > seconds + 1:
      isVisit[now + 1] = seconds + 1
      visitQueue.put((seconds + 1, now + 1))
  if now > 0 and now < 100001:
    if isVisit[2 * now] > seconds:
      isVisit[2 * now] = seconds
      visitQueue.put((seconds, 2 * now))

output(f"{isVisit[K]}")
